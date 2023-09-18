import db from "database";
import { dateToSlashDate } from "res/date_utils";

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

  static toString(history: History): string {
    return `- ${dateToSlashDate()} - ${history.title} : CB ${
      history.amount_cb
    }€ | LC ${history.amount_lc}€`;
  }

  static getFullHistoryToString(history: History[]): string {
    if (history.length === 0) return "*- Empty*";
    let string = "";

    history.forEach((h) => {
      string += `${this.toString(h)}\n`;
    });

    return string;
  }

  static getTotalCBSpent(history: History[]): number {
    let total = 0;

    history.forEach((h) => {
      total += h.amount_cb;
    });

    return total;
  }

  static getTotalLCSpent(history: History[]): number {
    let total = 0;

    history.forEach((h) => {
      total += h.amount_lc;
    });

    return total;
  }

  static emptyHistory() {
    const query = db.query("DELETE FROM history");
    query.run();
  }
}
