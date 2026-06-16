const SERVER_URL = "http://localhost:3001/api";

function handleInvalidResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  let type = response.headers.get("Content-Type");
  if (type !== null && type.indexOf("application/json") === -1) {
    throw new TypeError(`Expected JSON, got ${type}`);
  }
  return response;
}


const getNetwork = async () => {
  return await fetch(SERVER_URL + "/network", {
    method: "GET",
    credentials: "include",
  })
    .then(handleInvalidResponse)
    .then((res) => res.json());
};

const getSegments = async () => {
  return await fetch(SERVER_URL + "/network/segments", {
    method: "GET",
    credentials: "include",
  })
    .then(handleInvalidResponse)
    .then((res) => res.json());
};

const startGame = async () => {
  return await fetch(SERVER_URL + "/game/start", {
    method: "GET",
    credentials: "include",
  })
    .then(handleInvalidResponse)
    .then((res) => res.json());
};

const submitRoute = async (startId, endId, segments) => {
  return await fetch(SERVER_URL + "/game/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ startId, endId, segments }),
  })
    .then(handleInvalidResponse)
    .then((res) => res.json());
};

const getLeaderboard = async () => {
  return await fetch(SERVER_URL + "/leaderboard", {
    method: "GET",
    credentials: "include",
  })
    .then(handleInvalidResponse)
    .then((res) => res.json());
};

export {
  getNetwork,
  getSegments,
  startGame,
  submitRoute,
  getLeaderboard,
};
