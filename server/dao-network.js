import db from "./db.js";

export const getFullNetwork = () => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT stations.id, stations.name, lines.id as line_id, lines.name as line_name
    FROM stations
    JOIN line_stations ON stations.id = line_stations.station_id
    JOIN lines ON line_stations.line_id = lines.id`;
    db.all(query, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getSegments = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT s1.id as from_id, s1.name as from_station,
             s2.id as to_id, s2.name as to_station,
             l.id as line_id, l.name as line_name
      FROM line_stations ls1
      JOIN line_stations ls2 ON ls1.line_id = ls2.line_id 
                             AND ls2.position = ls1.position + 1
      JOIN stations s1 ON ls1.station_id = s1.id
      JOIN stations s2 ON ls2.station_id = s2.id
      JOIN lines l ON ls1.line_id = l.id
      
      UNION ALL
      
      SELECT s2.id as from_id, s2.name as from_station,
             s1.id as to_id, s1.name as to_station,
             l.id as line_id, l.name as line_name
      FROM line_stations ls1
      JOIN line_stations ls2 ON ls1.line_id = ls2.line_id 
                             AND ls2.position = ls1.position + 1
      JOIN stations s1 ON ls1.station_id = s1.id
      JOIN stations s2 ON ls2.station_id = s2.id
      JOIN lines l ON ls1.line_id = l.id
    `;
    db.all(query, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};
export const getAllStations = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT id, name FROM stations`;
    db.all(query, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};
