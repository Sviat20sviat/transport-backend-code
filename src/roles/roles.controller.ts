import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';
import { createRoleDto } from './dto/create-role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {

    }
    
    @ApiOperation({summary: "Creating Role"})
    @ApiResponse({status: 200, type: Role})
    @ApiBody({type: createRoleDto})
    @Post()
    create(@Body() dto: createRoleDto) {
        return this.rolesService.createRole(dto);
    }

    @ApiOperation({summary: "Get Role by Value"})
    @ApiResponse({status: 200, type: [Role]})
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value);
    }

    @ApiOperation({summary: "Get All"})
    @ApiResponse({status: 200, type: [Role]})
    @Get()
    getAll() {
        return this.rolesService.getAll();
    }
}
