import sqlite3 from "sqlite3";
import crypto from "crypto";

const db = new sqlite3.Database("LastRace.db", (err) => {
  if (err) throw err;
});

const createUser = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 32).toString("hex");
  return { salt, hash };
};

const u1 = createUser("1234");
const u2 = createUser("1234");
const u3 = createUser("1234");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS stations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS line_stations (
    line_id INTEGER NOT NULL,
    station_id INTEGER NOT NULL,
    position INTEGER NOT NULL,
    PRIMARY KEY (line_id, station_id),
    FOREIGN KEY (line_id) REFERENCES lines(id),
    FOREIGN KEY (station_id) REFERENCES stations(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    effect INTEGER NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    hash TEXT NOT NULL,
    salt TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    start_station_id INTEGER NOT NULL,
    end_station_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    started_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (start_station_id) REFERENCES stations(id),
    FOREIGN KEY (end_station_id) REFERENCES stations(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS game_segments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER NOT NULL,
    step_order INTEGER NOT NULL,
    from_station_id INTEGER NOT NULL,
    to_station_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    coins_after INTEGER NOT NULL,
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (from_station_id) REFERENCES stations(id),
    FOREIGN KEY (to_station_id) REFERENCES stations(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
  )`);

  db.run(`INSERT OR IGNORE INTO stations (name) VALUES (?)`, ["Chitgar"]);   
  db.run(`INSERT OR IGNORE INTO stations (name) VALUES (?)`, ["Azadi"]);      
  db.run(`INSERT OR IGNORE INTO stations (name) VALUES (?)`, ["Eram Sabz"]);  
  db.run(`INSERT OR IGNORE INTO stations (name) VALUES (?)`, ["Bime"]);      
  db.run(`INSERT OR IGNORE INTO stations (name) VALUES (?)`, ["Ekbatan"]);    
  db.run(`INSERT OR IGNORE INTO stations (name) VALUES (?)`, ["Mirdamad"]);  
  db.run(`INSERT OR IGNORE INTO stations (name) VALUES (?)`, ["Tajrish"]);    
  db.run(`INSERT OR IGNORE INTO stations (name) VALUES (?)`, ["Gheitarie"]); 
  db.run(`INSERT OR IGNORE INTO stations (name) VALUES (?)`, ["Gholhak"]);    
  db.run(`INSERT OR IGNORE INTO stations (name) VALUES (?)`, ["Saadi"]);     
  db.run(`INSERT OR IGNORE INTO stations (name) VALUES (?)`, ["Nabard"]);     
  db.run(`INSERT OR IGNORE INTO stations (name) VALUES (?)`, ["Piroozi"]);    
  db.run(`INSERT OR IGNORE INTO stations (name) VALUES (?)`, ["Amir Kabir"]); 
  db.run(`INSERT OR IGNORE INTO stations (name) VALUES (?)`, ["Molavi"]);    
  db.run(`INSERT OR IGNORE INTO stations (name) VALUES (?)`, ["Khayam"]);     

  db.run(`INSERT OR IGNORE INTO lines (name) VALUES (?)`, ["Green"]);  
  db.run(`INSERT OR IGNORE INTO lines (name) VALUES (?)`, ["Blue"]);   
  db.run(`INSERT OR IGNORE INTO lines (name) VALUES (?)`, ["Yellow"]); 
  db.run(`INSERT OR IGNORE INTO lines (name) VALUES (?)`, ["Pink"]);    

  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [1, 1, 1]);
  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [1, 2, 2]);
  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [1, 3, 3]);
  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [1, 4, 4]);
  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [1, 5, 5]);

  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [2, 1, 1]);
  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [2, 6, 2]);
  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [2, 7, 3]);
  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [2, 8, 4]);
  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [2, 9, 5]);

  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [3, 2, 1]);
  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [3, 6, 2]);
  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [3, 10, 3]);
  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [3, 11, 4]);
  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [3, 12, 5]);

  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [4, 4, 1]);
  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [4, 10, 2]);
  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [4, 13, 3]);
  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [4, 14, 4]);
  db.run(`INSERT OR IGNORE INTO line_stations VALUES (?,?,?)`, [4, 15, 5]);

  db.run(`INSERT OR IGNORE INTO events (description, effect) VALUES (?,?)`, ["Serene Passage", 0]);
  db.run(`INSERT OR IGNORE INTO events (description, effect) VALUES (?,?)`, ["Mistaken Departure", -2]);
  db.run(`INSERT OR IGNORE INTO events (description, effect) VALUES (?,?)`, ["Benevolent Traveler", 1]);
  db.run(`INSERT OR IGNORE INTO events (description, effect) VALUES (?,?)`, ["Network Disruption", -1]);
  db.run(`INSERT OR IGNORE INTO events (description, effect) VALUES (?,?)`, ["Unexpected Fortune", 3]);
  db.run(`INSERT OR IGNORE INTO events (description, effect) VALUES (?,?)`, ["Overlooked Destination", -3]);
  db.run(`INSERT OR IGNORE INTO events (description, effect) VALUES (?,?)`, ["Golden Opportunity", 4]);
  db.run(`INSERT OR IGNORE INTO events (description, effect) VALUES (?,?)`, ["Clever Thief", -4]);

  db.run(`INSERT OR IGNORE INTO users (username, hash, salt) VALUES (?,?,?)`, ["alice", u1.hash, u1.salt]);
  db.run(`INSERT OR IGNORE INTO users (username, hash, salt) VALUES (?,?,?)`, ["bob", u2.hash, u2.salt]);
  db.run(`INSERT OR IGNORE INTO users (username, hash, salt) VALUES (?,?,?)`, ["charlie", u3.hash, u3.salt]);

  db.run(`INSERT OR IGNORE INTO games (user_id, start_station_id, end_station_id, score, started_at) VALUES (?,?,?,?,?)`,
    [1, 1, 10, 18, "2026-06-01T10:00:00"]);

  db.run(`INSERT OR IGNORE INTO games (user_id, start_station_id, end_station_id, score, started_at) VALUES (?,?,?,?,?)`,
    [2, 2, 14, 12, "2026-06-01T11:00:00"]);

  db.run(`INSERT OR IGNORE INTO game_segments (game_id, step_order, from_station_id, to_station_id, event_id, coins_after) VALUES (?,?,?,?,?,?)`,
    [1, 1, 1, 2, 1, 20]);
 
  db.run(`INSERT OR IGNORE INTO game_segments (game_id, step_order, from_station_id, to_station_id, event_id, coins_after) VALUES (?,?,?,?,?,?)`,
    [1, 2, 2, 6, 3, 21]);
  
  db.run(`INSERT OR IGNORE INTO game_segments (game_id, step_order, from_station_id, to_station_id, event_id, coins_after) VALUES (?,?,?,?,?,?)`,
    [1, 3, 6, 10, 5, 18]);

  db.run(`INSERT OR IGNORE INTO game_segments (game_id, step_order, from_station_id, to_station_id, event_id, coins_after) VALUES (?,?,?,?,?,?)`,
    [2, 1, 2, 3, 4, 19]);

  db.run(`INSERT OR IGNORE INTO game_segments (game_id, step_order, from_station_id, to_station_id, event_id, coins_after) VALUES (?,?,?,?,?,?)`,
    [2, 2, 3, 4, 2, 17]);

  db.run(`INSERT OR IGNORE INTO game_segments (game_id, step_order, from_station_id, to_station_id, event_id, coins_after) VALUES (?,?,?,?,?,?)`,
    [2, 3, 4, 10, 1, 17]);
 
  db.run(`INSERT OR IGNORE INTO game_segments (game_id, step_order, from_station_id, to_station_id, event_id, coins_after) VALUES (?,?,?,?,?,?)`,
    [2, 4, 10, 13, 6, 14]);

  db.run(`INSERT OR IGNORE INTO game_segments (game_id, step_order, from_station_id, to_station_id, event_id, coins_after) VALUES (?,?,?,?,?,?)`,
    [2, 5, 13, 14, 2, 12]);
});

