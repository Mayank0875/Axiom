import { Router } from "express";
import { Routes } from "../utils/route.Interface";
import TodoController from "../controllers/todo.controller";

class TodoRoutes implements Routes{
    path?: string = "/todo";
    router: Router = Router();
    public todoController = new TodoController();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(`${this.path}/allTodos`, this.todoController.getTodos)
    }
}

export default TodoRoutes;