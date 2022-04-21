import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const userIsLoggedIn = req.cookies["logged_id"]
        const userId = req.cookies["user_id"]
        let userIdInt: number = parseInt(userId) || 0;

        const userObject = await this.userService.getUserById(userIdInt)

        if (!userIsLoggedIn || !userObject) {
            throw new HttpException("Forbidden", HttpStatus.FORBIDDEN)
        } else {
            next();
        }
    }
}
