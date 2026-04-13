/**
 * database.ts — Database Connection (Singleton Pattern)
 *
 * WHAT IT DOES:
 *   Creates and manages a single PostgreSQL connection pool for the entire app.
 *
 * DESIGN PATTERN: Singleton
 *   Only one Database instance is ever created. Every repository calls db.query()
 *   through this shared instance — no duplicate connections, no wasted resources.
 *
 * WHY:
 *   PostgreSQL connection pools are expensive to create. A singleton ensures
 *   all parts of the app share one pool instead of opening new connections each time.
 *
 * CONNECTS TO:
 *   - env.ts (reads DATABASE_URL)
 *   - Every repository file (imports `db` and calls db.query)
 */

import { Pool, QueryResultRow } from "pg";
import { env } from "./env";

class Database {
  private static instance: Database; // holds the single instance
  private readonly pool: Pool;       // the actual pg connection pool

  private constructor() {
    // Pool is created once using the DATABASE_URL from .env
    this.pool = new Pool({ connectionString: env.databaseUrl });
  }

  /** Returns the single shared Database instance (creates it on first call) */
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  /** Run a parameterized SQL query. Always use $1, $2 params — never string concat */
  public query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    params: unknown[] = []
  ) {
    return this.pool.query<T>(text, params);
  }
}

// Export a single shared instance — all repositories import this
export const db = Database.getInstance();
