import { Pool, QueryResultRow } from "pg";
import { env } from "./env";

// Database Singleton: one shared pool across the app.
class Database {
  private static instance: Database;
  private readonly pool: Pool;

  private constructor() {
    this.pool = new Pool({
      connectionString: env.databaseUrl,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    params: unknown[] = []
  ) {
    return this.pool.query<T>(text, params);
  }
}

export const db = Database.getInstance();

