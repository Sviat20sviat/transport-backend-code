import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(
        private jwtService: JwtService
    ) {

    }


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        if((req?.url as string).includes('auth')) {
            req.user = null;
            return true;
        };
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {
                console.log('arer !== Bearer || !toke!');
                throw new UnauthorizedException({message: "User unautorized!"});
            };

            const user = this.jwtService.verify(token);
            req.user = user;
            return true;

        } catch (error) {
            throw new UnauthorizedException({message: "User unautorized!"});
        }
    }
    
}