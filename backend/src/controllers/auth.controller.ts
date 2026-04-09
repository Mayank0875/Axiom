import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public register = async (req: Request, res: Response) => {
    const result = await this.authService.registerUser(req.body);
    res.status(201).json({ message: "User registered successfully", data: result });
  };

  public login = async (req: Request, res: Response) => {
    const result = await this.authService.loginUser(req.body);
    res.status(200).json({ message: "Login successful", data: result });
  };
}

