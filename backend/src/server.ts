import App from "./app";
import { env } from "./config/env";
import "./config/database";

const app = new App();

app.app.listen(env.port, () => {
  console.log(`Server listening on http://localhost:${env.port}`);
});
