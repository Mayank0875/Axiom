/**
 * server.ts — Entry Point
 *
 * WHAT IT DOES:
 *   Creates the App instance and starts the HTTP server on the configured port.
 *
 * WHY SEPARATE FROM app.ts:
 *   Keeping server startup separate from app configuration makes it easier
 *   to test the app without actually binding to a port.
 *
 * CONNECTS TO:
 *   - app.ts (creates the Express app)
 *   - config/env.ts (reads PORT)
 *   - config/database.ts (imported to trigger pool creation at startup)
 */

import App from "./app";
import { env } from "./config/env";
import "./config/database"; // trigger DB pool creation on startup

const app = new App();

app.app.listen(env.port, () => {
  console.log(`Server listening on http://localhost:${env.port}`);
});


