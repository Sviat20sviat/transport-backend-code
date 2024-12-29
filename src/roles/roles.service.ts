import { Injectable } from '@nestjs/common';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';
import { createRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role) private roleRepository: typeof Role
    ) {}


    async createRole(dto: createRoleDto): Promise<Role> {

        const role = await this.roleRepository.create(dto);
        return role;

    }

    async getRoleByValue(value: string): Promise<Role> {
        const role = await this.roleRepository.findOne({where: {value}});
        return role;
    }

    
    async getRoleById(id: number): Promise<Role> {
        const role = await this.roleRepository.findOne({where: {id}});
        return role;
    }

    async getAll() {
        const roles = this.roleRepository.findAll({include: {all: true}});
        return roles;
    }
}
