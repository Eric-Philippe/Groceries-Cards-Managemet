import db from "database";

/**
 * @DATABASE_SCHEMA
 *  - CARDS
 *      - id: VARCHAR(20) PRIMARY KEY  |  amount: INTEGER NOT NULL
 *
 * - HISTORY
 *     - id: INTEGER PRIMARY KEY AUTOINCREMENT  |  title: VARCHAR(50) NOT NULL  |  amount_cb: INTEGER NOT NULL  |  amount_lc: INTEGER NOT NULL  |  timestamp: DATETIME DEFAULT CURRENT_TIMESTAMP
 */

db.run(/* sql */ `
      CREATE TABLE IF NOT EXISTS cards (
          id VARCHAR(20) PRIMARY KEY,
          amount INTEGER NOT NULL
      );
  `);

console.log("Table cards created successfully");

db.run(/* sql */ `
      CREATE TABLE IF NOT EXISTS history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title VARCHAR(50) NOT NULL,
          amount_cb INTEGER NOT NULL,
          amount_lc INTEGER NOT NULL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );
  `);

console.log("Table history created successfully");

/**
 * @DATABASE_DEFAULT_VALUES
 * @description Insert the two cards we're using here
 */

db.run(/* sql */ `
    INSERT INTO cards (id, amount)
    VALUES ('Carte Bleue', 0)
    ON CONFLICT DO NOTHING;
    `);

db.run(/* sql */ `
    INSERT INTO cards (id, amount)
    VALUES ('Lunch Card', 0)
    ON CONFLICT DO NOTHING;
    `);

console.log("Default values inserted successfully");
