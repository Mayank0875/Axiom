/**
 * controllers/auth.controller.ts — Authentication Controller
 *
 * LAYER: Controller (3rd layer in the chain: Route → Controller → Service)
 *
 * WHAT IT DOES:
 *   Handles HTTP requests for user registration and login.
 *   It reads the request body, delegates ALL logic to AuthService,
 *   and sends back the JSON response.
 *
 * DESIGN PATTERN: Controller (MVC)
 *   This class has ONE job — be the HTTP adapter.
 *   It does NOT validate passwords, hash anything, or touch the database.
 *   All of that is AuthService's responsibility.
 *
 * DEPENDENCY INJECTION:
 *   AuthService is passed in via constructor. The route file creates:
 *     new AuthController(new AuthService(new AuthRepository()))
 *   This means AuthController never imports AuthRepository directly —
 *   it only knows about AuthService. Loose coupling.
 *
 * ENDPOINTS HANDLED:
 *   POST /api/v1/auth/register  → register()
 *   POST /api/v1/auth/login     → login()
 *
 * CONNECTS TO:
 *   - services/auth.service.ts  (delegates all logic here)
 *   - routes/auth.routes.ts     (this controller is instantiated there)
 */

import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  // AuthService injected — controller never creates its own dependencies
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/register
   * Body: { universityId, fullName, email, password }
   * Returns: { token, user, roles }
   */
  public register = async (req: Request, res: Response) => {
    const result = await this.authService.registerUser(req.body);
    res.status(201).json({ message: "User registered successfully", data: result });
  };

  /**
   * POST /auth/login
   * Body: { email, password }
   * Returns: { token, user, roles }
   */
  public login = async (req: Request, res: Response) => {
    const result = await this.authService.loginUser(req.body);
    res.status(200).json({ message: "Login successful", data: result });
  };
}
