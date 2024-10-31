import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/roles/roles.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddUserRoleDto } from './dto/add-user-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { deleteUserDto } from './dto/delete-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { setUserChatIdDto } from './dto/setUserChatId.dto';
// import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('User')
@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ) {}

    @ApiOperation({summary: "Creating User"})
    @ApiResponse({status: 200, type: User})
    @ApiBody({type: createUserDto})
    @Post()
    create(@Body() userDto: createUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: "Get Users"})
    @ApiResponse({status: 200, type: [User]})
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: "Get User By Id"})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Post('/getUserById')
    getUserById(@Body() data: {userId: string}) {
        return this.usersService.getUserById(data.userId);
    }

    @ApiOperation({summary: "Set Roles"})
    @ApiResponse({status: 200})
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddUserRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: "BAN User"})
    @ApiResponse({status: 200})
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.banUser(dto);
    }

    @ApiOperation({summary: "Delete User"})
    @ApiResponse({status: 200})
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Post('/delete')
    deleteUser(@Body() dto: deleteUserDto) {
        return this.usersService.deleteUser(dto);
    }

    @ApiOperation({summary: "Update User"})
    @ApiResponse({status: 200})
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Post('/update')
    UpdateUser(@Body() dto: updateUserDto) {
        return this.usersService.updateUser(dto);
    }

    @ApiOperation({summary: "Set User Telegram ChatId"})
    @ApiResponse({status: 200})
    @Post('/setChatId')
    setTelegramChatIdToUser(@Body() dto: setUserChatIdDto) {
        return this.usersService.setTelegramChatIdToUser(dto);
    }
}
