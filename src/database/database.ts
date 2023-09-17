import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite", { create: true });

export default db;
