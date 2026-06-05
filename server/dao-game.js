import db from "./db.js";
import { getSegments } from "./dao-network.js";

export const getLeaderboard = () => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT users.username, MAX(games.score) as best_score
    FROM games
    JOIN users ON games.user_id = users.id
    GROUP BY games.user_id
    ORDER BY best_score DESC`;
    db.all(query, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getRandomEvent = () => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT * FROM events 
    ORDER BY RANDOM()
    LIMIT 1`;
    db.get(query, [], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const saveGame = (userId, startId, endId, score) => {
  return new Promise((resolve, reject) => {
    const query = `
    INSERT INTO games (user_id, start_station_id, end_station_id, score, started_at)
    VALUES (?, ?, ?, ?, ?)`;
    db.run(
      query,
      [userId, startId, endId, score, new Date().toISOString()],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      },
    );
  });
};
export const saveGameSegment = (
  gameId,
  stepOrder,
  fromId,
  toId,
  eventId,
  coinsAfter,
) => {
  return new Promise((resolve, reject) => {
    const query = `
INSERT INTO game_segments (game_id, step_order, from_station_id, to_station_id, event_id, coins_after)
        VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(
      query,
      [gameId, stepOrder, fromId, toId, eventId, coinsAfter],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      },
    );
  });
};
export const getRandomStartEnd = async () => {
  const segments = await getSegments();

  const graph = {};
  for (const seg of segments) {
    if (!graph[seg.from_id]) graph[seg.from_id] = [];
    if (!graph[seg.to_id]) graph[seg.to_id] = [];
    graph[seg.from_id].push(seg.to_id);
    graph[seg.to_id].push(seg.from_id);
  }

  const stationIds = Object.keys(graph).map(Number);

  const startId = stationIds[Math.floor(Math.random() * stationIds.length)];

  const distances = { [startId]: 0 };
  const queue = [startId];

  while (queue.length > 0) {
    const current = queue.shift();
    for (const neighbor of graph[current]) {
      if (distances[neighbor] === undefined) {
        distances[neighbor] = distances[current] + 1;
        queue.push(neighbor);
      }
    }
  }

  const validDestinations = Object.entries(distances)
    .filter(([id, dist]) => dist >= 3)
    .map(([id]) => Number(id));

  if (validDestinations.length === 0) return null;

  const endId =
    validDestinations[Math.floor(Math.random() * validDestinations.length)];

  return { startId, endId };
};
