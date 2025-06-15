import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuditService } from 'src/audit-log/audit.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private auditService: AuditService
    ) {

    }

    @ApiOperation({summary: "Login"})
    @ApiResponse({status: 200})
    @Post('/login')
    async login(@Body() userDto: createUserDto) {
        const res = await this.authService.login(userDto);
        this.auditService.logAction(
            'login',
            'login',
            res.user.id,
            null,
            null,
            res?.user?.id,
            res?.user
          );
        return res;
    }

    @ApiOperation({summary: "Registration"})
    @ApiResponse({status: 200})
    @Post('/register')
    registration(@Body() userDto: createUserDto) {
        return this.authService.registration(userDto);
    }
} 
