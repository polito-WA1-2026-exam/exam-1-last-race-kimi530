import db from "./db.js";
import crypto from "crypto";


    export const getUserById = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id=?';
            db.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                }
                else if (row === undefined) {
                    resolve({error: 'User not found.'});
                } else {
                    resolve(row);
                }
            });
        });
    };

    export const getUserByCredentials = (username, password) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE username=?';
            db.get(sql, [username], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row === undefined) {
                    resolve(false);
                }
                else {
                    const user = { id: row.id, username: row.username, };

               
                    crypto.scrypt(password, row.salt, 32, function (err, hashedPassword) { 
                        if (err) reject(err);
                        if (!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword)) 
                            resolve(false);
                        else
                            resolve(user);
                    });
                }
            });
        });
    }
