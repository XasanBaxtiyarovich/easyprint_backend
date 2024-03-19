import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from 'express';
import { Users } from '../users/entities'; // Убедитесь, что путь указан правильно

// Определяем интерфейс расширяющий Request из express и добавляющий свойство user
export interface AuthenticatedRequest extends Request {
    user?: Partial<Users>;
}

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<AuthenticatedRequest>(); // Используем наш расширенный интерфейс AuthenticatedRequest

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException("User unauthorized.");
        }

        const [bearer, token] = authHeader.split(' ');

        if (bearer !== "Bearer" || !token) {
            throw new UnauthorizedException("User unauthorized");
        }

        try {
            // Верификация токена
            const user: Partial<Users> = await this.jwtService.verify(token, {
                secret: process.env.ACCES_TOKEN_KEY_PERSON,
            });

            if (!user) {
                throw new UnauthorizedException("Invalid token provided");
            }

            // Устанавливаем пользователя в свойство user объекта req
            req.user = user;
            
            return true;
        } catch (error) {
            throw new UnauthorizedException("Invalid token provided");
        }
    }
}
