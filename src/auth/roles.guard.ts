import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {

    }


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);
            console.log('requiredRoles!',requiredRoles);
            if(!requiredRoles) {
                return true;
            };



            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedException({message: "User unautorized. No User!"});
            }
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            
            console.log('bearer!token',bearer, token);

            if (bearer !== 'Bearer' || !token) {
                console.log('arer !== Bearer || !toke!');
                throw new UnauthorizedException({message: "User unautorized. No User!"});
            };

            const user = this.jwtService.verify(token);
            console.log('CONSOLE!',user);

            const isRoleAllow = user.roles.some(role => (requiredRoles as Array<string>).includes(role.value));
            console.log('isRoleAllow!',isRoleAllow);
            return isRoleAllow;
        } catch (error) {
            console.log('error!',error);
            throw new HttpException("User dont have permission!", HttpStatus.FORBIDDEN);
        }
    }
    
}