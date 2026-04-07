import { Request, Response } from "express";

class TodoController{
    public getTodos = async function(req: Request, res: Response){
        res.status(200).json("Hello")
    }
}

export default TodoController;