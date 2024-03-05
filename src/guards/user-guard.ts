import { Users } from 'src/users/entities';

import { JwtService } from '@nestjs/jwt';
import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"


@Injectable()
export class UserGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService){}

    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();

        const authHeader = req.headers.authorization;

        if(!authHeader) throw new UnauthorizedException("User unauthorized.");
        
        const token = authHeader.split(' ')[1];
        const bearer = authHeader.split(' ')[0];
        
        if(bearer !="Bearer" || !token) throw new Error("User unauthorized");   
        
        async function verify(token: string, jwtService: JwtService) {
            const user: Partial<Users> = await jwtService.verify(token,{
                secret:process.env.ACCESS_TOKEN_KEY,
            })

            if(!user) throw new UnauthorizedException("Invalid token provided");
            

            if(!user.is_active) throw new BadRequestException("user is not active");
            
            return true;
        }

        return verify(token, this.jwtService);
    }
}