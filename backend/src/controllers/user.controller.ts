import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  public getUsers = async (_req: Request, res: Response) => {
    const users = await this.userService.listUsers();
    res.status(200).json({ message: "Users fetched successfully", data: users });
  };

  public createUser = async (req: Request, res: Response) => {
    const user = await this.userService.createUser(req.body);
    res.status(201).json({ message: "User created successfully", data: user });
  };

  public assignRole = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const role = req.body.role;
    const result = await this.userService.assignRole(userId, role);
    res.status(200).json({ message: "Role assigned successfully", data: result });
  };
}

