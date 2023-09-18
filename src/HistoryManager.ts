import db from "database";

import { dateToSlashDate } from "res/date_utils";

import { History } from "types/History";

/**
 * @class HistoryManager
 * @description Manage the history of the groceries spending
 * @exports HistoryManager
 * @static
 */
export default class HistoryManager {
  /**
   * Create a new history entry
   * @param title - The title of the spending
   * @param amount_cb - The amount spent with the CB
   * @param amount_lc - The amount spent with the LC
   */
  static setHistory(title: string, amount_cb: number, amount_lc: number) {
    const date = new Date();

    const query = db.query(
      "INSERT INTO history (title, amount_cb, amount_lc, timestamp) VALUES (?, ?, ?, ?)"
    );

    query.run(title, amount_cb, amount_lc, date.toISOString());
  }

  /**
   * Get the history of the groceries spending
   * @param afterMonth - The month after which the history will be returned | Default : current month
   * @param afterYear - The year after which the history will be returned | Default : current year
   * @returns The history of the groceries spending
   */
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

  /**
   * Get the history of the groceries spending as a string
   * @param history - The history of the groceries spending
   * @returns The history of the groceries spending as a string
   */
  static toString(history: History): string {
    return `- ${dateToSlashDate()} - ${history.title} : CB ${
      history.amount_cb
    }€ | LC ${history.amount_lc}€`;
  }

  /**
   * Get the history of the groceries spending as a string
   * @param history - The history of the groceries spending
   * @returns The history of the groceries spending as a string
   */
  static getFullHistoryToString(history: History[]): string {
    if (history.length === 0) return "*- Empty*";
    let string = "";

    history.forEach((h) => {
      string += `${this.toString(h)}\n`;
    });

    return string;
  }

  /**
   * Get the total amount spent with the CB
   * @param history - The history of the groceries spending
   * @returns The total amount spent with the CB
   */
  static getTotalCBSpent(history: History[]): number {
    let total = 0;

    history.forEach((h) => {
      total += h.amount_cb;
    });

    return total;
  }

  /**
   * Get the total amount spent with the LC
   * @param history - The history of the groceries spending
   * @returns The total amount spent with the LC
   */
  static getTotalLCSpent(history: History[]): number {
    let total = 0;

    history.forEach((h) => {
      total += h.amount_lc;
    });

    return total;
  }

  /**
   * Empty the history of the groceries spending
   * @returns void
   * @static
   */
  static emptyHistory() {
    const query = db.query("DELETE FROM history");
    query.run();
  }
}
