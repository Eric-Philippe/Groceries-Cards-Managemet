import db from "database";

import { Card } from "types/Card";

export default class CardsManager {
  static getCBAmount(): number {
    const query = db.query("SELECT * FROM cards WHERE id = 'Carte Bleue'");
    const values: Card[] = query.all() as Card[];

    return values[0].amount;
  }

  static getLCAmount(): number {
    const query = db.query("SELECT * FROM cards WHERE id = 'Lunch Card'");
    const values: Card[] = query.all() as Card[];

    return values[0].amount;
  }

  static setCBAmount(amount: number): void {
    const query = db.query(
      "UPDATE cards SET amount = ? WHERE id = 'Carte Bleue'"
    );
    query.run(amount);
  }

  static setLCAmount(amount: number): void {
    const query = db.query(
      "UPDATE cards SET amount = ? WHERE id = 'Lunch Card'"
    );
    query.run(amount);
  }

  static addCBAmount(amount: number): void {
    const query = db.query(
      "UPDATE cards SET amount = amount + ? WHERE id = 'Carte Bleue'"
    );
    query.run(amount);
  }

  static addLCAmount(amount: number): void {
    const query = db.query(
      "UPDATE cards SET amount = amount + ? WHERE id = 'Lunch Card'"
    );
    query.run(amount);
  }

  static subCBAmount(amount: number): void {
    const query = db.query(
      "UPDATE cards SET amount = amount - ? WHERE id = 'Carte Bleue'"
    );
    query.run(amount);
  }

  static subLCAmount(amount: number): void {
    const query = db.query(
      "UPDATE cards SET amount = amount - ? WHERE id = 'Lunch Card'"
    );
    query.run(amount);
  }
}
