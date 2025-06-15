import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs"
import { User } from 'src/users/users.model';
import { ChangePasswordDto } from './dto/changePasswordDto.dto';

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
        const userByEmail = await this.userService.getUserByEmail(userDto.email);
        const userByNick = await this.userService.getUserByNickname(userDto.email);
        const userByPhone = await this.userService.getUserByPhone(userDto.email);
        if(!userByEmail && userByNick && userByPhone) {
            throw new UnauthorizedException({ message: "UNCORRECT CREDENTIALS" });
        }
        if(userByEmail) {
            const passwordEquals = await bcrypt.compare(userDto.password, userByEmail.password);
            if (userByEmail && passwordEquals) {
                return userByEmail;
            } else {
                throw new UnauthorizedException({ message: "UNCORRECT CREDENTIALS" });
            };
        }
        if(userByNick) {
            const passwordEquals = await bcrypt.compare(userDto.password, userByNick.password);
            if (userByNick && passwordEquals) {
                return userByNick;
            } else {
                throw new UnauthorizedException({ message: "UNCORRECT CREDENTIALS" });
            };
        }
        if(userByPhone) {
            const passwordEquals = await bcrypt.compare(userDto.password, userByPhone.password);
            if (userByPhone && passwordEquals) {
                return userByPhone;
            } else {
                throw new UnauthorizedException({ message: "UNCORRECT CREDENTIALS" });
            };
        }
    }

    
}
