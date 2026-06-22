import express from "express";
import morgan from "morgan";
import cors from "cors";
import { check, validationResult } from "express-validator";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import { getUserById, getUserByCredentials } from "./dao-users.js";
import { getFullNetwork, getSegments } from "./dao-network.js";
import {
  getRandomStartEnd,
  saveGame,
  saveGameSegment,
  getRandomEvent,
  getLeaderboard,
} from "./dao-game.js";

const validateRoute = (segments, startId, endId, allSegments) => {
  if (segments[0].fromId !== startId) return false;

  if (segments[segments.length - 1].toId !== endId) return false;

  for (let i = 0; i < segments.length - 1; i++) {
    if (segments[i].toId !== segments[i + 1].fromId) return false;
  }

  const allReal = segments.every((seg) =>
    allSegments.some(
      (valid) =>
        (valid.from_id === seg.fromId && valid.to_id === seg.toId) ||
        (valid.from_id === seg.toId && valid.to_id === seg.fromId),
    ),
  );
  if (!allReal) return false;

  const keys = segments.map((s) => `${s.fromId}-${s.toId}`);
  const uniqueKeys = new Set(keys);
  if (uniqueKeys.size !== segments.length) return false;

  let currentLine = null;

  for (const seg of segments) {
    const validLines = allSegments
      .filter(
        (valid) =>
          (valid.from_id === seg.fromId && valid.to_id === seg.toId) ||
          (valid.from_id === seg.toId && valid.to_id === seg.fromId),
      )
      .map((valid) => valid.line_id);

    if (currentLine === null) {
      currentLine = validLines[0];
    } else if (validLines.includes(currentLine)) {
      currentLine = currentLine;
    } else {
      const isInterchange =
        allSegments
          .filter(
            (valid) =>
              valid.from_id === seg.fromId || valid.to_id === seg.fromId,
          )
          .map((valid) => valid.line_id)
          .filter((v, i, a) => a.indexOf(v) === i).length > 1;

      if (!isInterchange) return false;
      currentLine = validLines[0];
    }
  }

  return true;
};

const app = new express();
app.use(morgan("dev"));
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

passport.use(
  new LocalStrategy(async function verify(username, password, callback) {
    const user = await getUserByCredentials(username, password);
    if (!user) return callback(null, false, "Incorrect username or password");

    return callback(null, user);
  }),
);

passport.serializeUser(function (user, callback) {
  callback(null, user);
});

passport.deserializeUser(function (user, callback) {
  return callback(null, user);
});

app.use(
  session({
    secret: "This is a very secret information used to initialize the session!",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.authenticate("session"));

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: "Not authorized" });
};

const onValidationErrors = (validationResult, res) => {
  const errors = validationResult.formatWith(errorFormatter);
  return res.status(422).json({ validationErrors: errors.mapped() });
};

// Only keep the error message in the response
const errorFormatter = ({ msg }) => {
  return msg;
};

/*** Users APIs ***/

// POST /api/sessions
// This route is used for performing login.
app.post("/api/sessions", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: info });
    }

    req.login(user, (err) => {
      if (err) return next(err);

      return res.json(req.user);
    });
  })(req, res, next);
});

app.get("/api/sessions/current", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else res.status(401).json({ error: "Not authenticated" });
});

app.delete("/api/sessions/current", (req, res) => {
  req.logout(() => {
    res.end();
  });
});

app.get("/api/network", async (req, res) => {
  try {
    const network = await getFullNetwork();
    res.json(network);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/api/network/segments", isLoggedIn, async (req, res) => {
  try {
    const segments = await getSegments();
    res.json(segments);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/api/game/start", isLoggedIn, async (req, res) => {
  try {
    const result = await getRandomStartEnd();
    if (!result)
      return res
        .status(500)
        .json({ error: "Could not find valid start/end pair" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/api/leaderboard", isLoggedIn, async (req, res) => {
  try {
    const result = await getLeaderboard();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/game/submit", isLoggedIn, async (req, res) => {
  const { startId, endId, segments } = req.body;

  if (!startId || !endId || !Array.isArray(segments))
    return res.status(422).json({ error: "Invalid request body" });

  try {
    const allSegments = await getSegments();
    const isValid =
      segments.length > 0 &&
      validateRoute(segments, startId, endId, allSegments);

    if (!isValid) {
      await saveGame(req.user.id, startId, endId, 0);
      return res.json({ valid: false, score: 0, steps: [] });
    }

    let coins = 20;
    let stepOrder = 1;
    const steps = [];
    const segmentData = [];

    for (const seg of segments) {
      const event = await getRandomEvent();
      coins += event.effect;

      steps.push({
        fromId: seg.fromId,
        toId: seg.toId,
        fromStation:
          allSegments.find((s) => s.from_id === seg.fromId)?.from_station ||
          seg.fromId,
        toStation:
          allSegments.find((s) => s.to_id === seg.toId)?.to_station || seg.toId,
        event: event.description,
        effect: event.effect,
        coinsAfter: coins,
      });

      segmentData.push({
        fromId: seg.fromId,
        toId: seg.toId,
        eventId: event.id,
        coinsAfter: coins,
        stepOrder: stepOrder++,
      });
    }

    const finalScore = Math.max(0, coins);
    const gameId = await saveGame(req.user.id, startId, endId, finalScore);

    for (const seg of segmentData) {
      await saveGameSegment(
        gameId,
        seg.stepOrder,
        seg.fromId,
        seg.toId,
        seg.eventId,
        seg.coinsAfter,
      );
    }

    return res.json({ valid: true, score: finalScore, steps });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
