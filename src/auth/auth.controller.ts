import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {

    }

    @ApiOperation({summary: "Login"})
    @ApiResponse({status: 200})
    @Post('/login')
    login(@Body() userDto: createUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({summary: "Registration"})
    @ApiResponse({status: 200})
    @Post('/register')
    registration(@Body() userDto: createUserDto) {
        return this.authService.registration(userDto);
    }
} 
