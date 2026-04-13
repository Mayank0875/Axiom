/**
 * httpError.ts — Custom HTTP Error Class
 *
 * WHAT IT DOES:
 *   A typed error class that carries an HTTP status code alongside the message.
 *
 * WHY:
 *   When a service throws `new HttpError(404, "User not found")`, the global
 *   error handler in app.ts can detect it's an HttpError and respond with
 *   the correct status code instead of always returning 500.
 *
 * DESIGN PATTERN: Custom Exception (extends Error)
 *   Follows the standard OOP pattern of extending the base Error class
 *   to add domain-specific information (statusCode).
 *
 * USAGE:
 *   throw new HttpError(400, "Invalid email");   // 400 Bad Request
 *   throw new HttpError(404, "Quiz not found");  // 404 Not Found
 *   throw new HttpError(409, "Already enrolled");// 409 Conflict
 *
 * CONNECTS TO:
 *   - app.ts (error handler checks instanceof HttpError)
 *   - All service files (throw HttpError for business rule violations)
 */

export class HttpError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
