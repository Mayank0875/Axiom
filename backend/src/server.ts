import App from "./app";
import TodoRoutes from "./routes/todo";

const app = new App([new TodoRoutes()]);
app.startServer();
