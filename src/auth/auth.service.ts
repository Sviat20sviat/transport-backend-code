import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs"
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
    
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {

    }


    async login(userDto: createUserDto) {
        const user =  await this.validateUser(userDto);
        return {token: await this.generateToken(user), user};
    }

    async registration(userDto: createUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException("Email Already Used", HttpStatus.BAD_REQUEST)
        };

        const hashPass = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPass});
        return user;
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles};
        return {
            token: this.jwtService.sign(payload)
        };
    }

    private async validateUser(userDto: createUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if(!user) {
            throw new UnauthorizedException({ message: "UNCORRECT CREDENTIALS" });
        }
        console.log(' private async validateUse! user',user);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        } else {
            throw new UnauthorizedException({ message: "UNCORRECT CREDENTIALS" });
        };
    }

    
}
