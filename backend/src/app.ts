import express from "express";
import { Routes } from "./utils/route.Interface";
import { connect } from "mongoose";

class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = 8080;
    this.initializeRoutes(routes);
    this.connectDatabase();
  }

  public startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on http://localhost:${this.port}`);
    });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private connectDatabase() {
    connect("mongodb+srv://hello") // add your connection string here
      .then(() => {
        console.log("Database connected...");
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export default App;
