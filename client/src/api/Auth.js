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

const logIn = async (credentials) => {
  return await fetch(SERVER_URL + "/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  })
    .then(handleInvalidResponse)
    .then((response) => response.json());
};
const getUserInfo = async () => {
  return await fetch(SERVER_URL + "/sessions/current", {
    credentials: "include",
  })
    .then(handleInvalidResponse)
    .then((response) => response.json());
};

const logOut = async () => {
  return await fetch(SERVER_URL + "/sessions/current", {
    method: "DELETE",
    credentials: "include",
  }).then(handleInvalidResponse);
};

export { logIn, getUserInfo, logOut };