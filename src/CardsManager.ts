import db from "database";

import { Card } from "types/Card";

/**
 * @class CardsManager
 * @description Manage the cards
 * @exports CardsManager
 * @static
 */
export default class CardsManager {
  /**
   * Get the amount of money left on the CB
   * @returns The amount of money left on the CB
   */
  static getCBAmount(): number {
    const query = db.query("SELECT * FROM cards WHERE id = 'Carte Bleue'");
    const values: Card[] = query.all() as Card[];

    return values[0].amount;
  }

  /**
   * Get the amount of money left on the LC
   * @returns The amount of money left on the LC
   */
  static getLCAmount(): number {
    const query = db.query("SELECT * FROM cards WHERE id = 'Lunch Card'");
    const values: Card[] = query.all() as Card[];

    return values[0].amount;
  }

  /**
   * Set the amount of money left on the CB
   * @param amount - The new amount of money left on the CB
   */
  static setCBAmount(amount: number): void {
    const query = db.query(
      "UPDATE cards SET amount = ? WHERE id = 'Carte Bleue'"
    );
    query.run(amount);
  }

  /**
   * Set the amount of money left on the LC
   * @param amount - The new amount of money left on the LC
   */
  static setLCAmount(amount: number): void {
    const query = db.query(
      "UPDATE cards SET amount = ? WHERE id = 'Lunch Card'"
    );
    query.run(amount);
  }

  /**
   * Add an amount to the CB
   * @param amount - The amount to add to the CB
   */
  static addCBAmount(amount: number): void {
    const query = db.query(
      "UPDATE cards SET amount = amount + ? WHERE id = 'Carte Bleue'"
    );
    query.run(amount);
  }

  /**
   * Add an amount to the LC
   * @param amount - The amount to add to the LC
   */
  static addLCAmount(amount: number): void {
    const query = db.query(
      "UPDATE cards SET amount = amount + ? WHERE id = 'Lunch Card'"
    );
    query.run(amount);
  }

  /**
   * Substract an amount to the CB
   * @param amount - The amount to substract to the CB
   */
  static subCBAmount(amount: number): void {
    const query = db.query(
      "UPDATE cards SET amount = amount - ? WHERE id = 'Carte Bleue'"
    );
    query.run(amount);
  }

  /**
   * Substract an amount to the LC
   * @param amount - The amount to substract to the LC
   */
  static subLCAmount(amount: number): void {
    const query = db.query(
      "UPDATE cards SET amount = amount - ? WHERE id = 'Lunch Card'"
    );
    query.run(amount);
  }
}
