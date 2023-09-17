import db from "database";

import { History } from "types/History";

export default class HistoryManager {
  static setHistory(title: string, amount_cb: number, amount_lc: number) {
    const date = new Date();

    const query = db.query(
      "INSERT INTO history (title, amount_cb, amount_lc, timestamp) VALUES (?, ?, ?, ?)"
    );

    query.run(title, amount_cb, amount_lc, date.toISOString());
  }

  static getHistory(
    afterMonth: number = new Date().getMonth(),
    afterYear: number = new Date().getFullYear()
  ): History[] {
    const query = db.query("SELECT * FROM history");
    const values = query.all() as History[];

    const history = values.filter((h) => {
      const date = new Date(h.timestamp);

      return date.getMonth() >= afterMonth && date.getFullYear() >= afterYear;
    });

    return history;
  }
}
