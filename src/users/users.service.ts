import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { createUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddUserRoleDto } from './dto/add-user-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { deleteUserDto } from './dto/delete-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { setUserChatIdDto } from './dto/setUserChatId.dto';
import { GetFilteredUsersDto } from './dto/GetFilteredUsers.dto';
import { SetUserBalanceDto } from './dto/setUserBalance.dto';
import { SetUserFavoriteAddressDto } from './dto/set-user-favorite-address.dto';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService
    ) {}


    async createUser(dto: createUserDto) {

        const userValues = {
            email: dto.email,
            password: dto.password,
            nickname: dto.nickname,
            phoneNumber: dto.phoneNumber,
            phoneNumberSecond: dto.phoneNumberSecond,
            firstName: dto.firstName,
            lastName: dto.lastName
        }

        const user = await this.userRepository.create(userValues);
        let role;
        if(dto.isDriver) {
            role = await this.roleService.getRoleByValue('Driver');
        } else {
            role = await this.roleService.getRoleByValue('User');
        };
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;

    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user;
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findOne({where: {id}, include: {all: true}});
        return user;
    }

    async addRole(dto: AddUserRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);

        if (user && role) {
            await user.$add('role', role.id);
            return dto;
        };

        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }

    async banUser(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (user) {
            user.banned = true;
            user.banReason = dto.banReason;
            await user.save();
            return user;
        };
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async deleteUser(dto: deleteUserDto) {
        console.log('deleteUser!',dto);
        const user = await this.userRepository.findOne({where: {id: dto.id}, include: {all: true}});
        console.log('user!',user);
        if(user) {
            await user.destroy();
            return {
                deleted: true
            }
        };
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async updateUser(dto: updateUserDto) {
        const user = await this.userRepository.findOne({where: {id: dto.id}, include: {all: true}});
        if(user) {
            console.log('user!',user);
            if(dto?.firstName){
                await user.set('firstName', dto.firstName);
            };
            if(dto?.lastName){
                await user.set('lastName', dto.lastName);
            };
            if(dto?.phoneNumber){
                await user.set('phoneNumber', dto.phoneNumber);
            };
            if(dto?.phoneNumberSecond){
                await user.set('phoneNumberSecond', dto.phoneNumber);
            };
            if(dto?.email){
                await user.set('email', dto.email);
            };
            await user.save();
            return user;
        };
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async setTelegramChatIdToUser(dto: setUserChatIdDto) {
        console.log('setTelegramChatIdToUser!',dto);
        const user = await this.userRepository.findOne({where: {id: dto.id}, include: {all: true}});
        if(user) {
            console.log('user!',user);
            if(dto.chatId){
                await user.set('chatId', dto.chatId);
            };
            await user.save();
            return user;
        };
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async getFiltederUsers(dto: GetFilteredUsersDto) {
        const where: any = {};
        if(dto?.status) {
            where.status = dto.status
        };

        const users = await this.userRepository.findAll({where, include: {all: true}});
        let filteredUsers;
        if(dto?.roleId && users?.length) {
            filteredUsers = users.filter(user => user.roles.some(role => role.id == dto.roleId));
            return filteredUsers
        }
        
        return users;
    }

    async setUserBalance (dto: SetUserBalanceDto): Promise<User> {
        const user = await this.getUserById(dto.userId);

        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        if(dto.balance || dto.balance == 0) {
            await user.set('balance', dto.balance);
        };
        await user.save();
        return user;
    }

    
    async setUserFavoriteAddress (dto: SetUserFavoriteAddressDto): Promise<User> {
        const user = await this.getUserById(dto.userId);

        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        };
        if((dto as any).addresses?.length) {
            let addresses = [];
            // if(user?.favoriteAddresses?.length) {
            //     addresses = [...user?.favoriteAddresses, ...(dto as any).addresses]
            // } else {
                addresses = dto.addresses;
            // };

            await user.set('favoriteAddresses', addresses);
        };
        await user.save();
        return user;
    }

    async searchUser (value: string): Promise<User | null> {
        const userByEmail = await this.userRepository.findOne({where: {email: value}, include: {all: true}}); 
        const userByNick = await this.userRepository.findOne({where: {nickname: value}, include: {all: true}});
        const userByFirstName = await this.userRepository.findOne({where: {firstName: value}, include: {all: true}}); 
        const userByLastName = await this.userRepository.findOne({where: {lastName: value}, include: {all: true}});
        const userByPhone = await this.userRepository.findOne({where: {phoneNumber: value}, include: {all: true}});
        const userByPhoneSecond = await this.userRepository.findOne({where: {phoneNumberSecond: value}, include: {all: true}});

        const users = [userByEmail, userByNick, userByFirstName, userByLastName, userByPhone, userByPhoneSecond];
        let findedUser;
        users?.forEach((user) => {
            if(user?.id) {
                findedUser = user;
                return user;
            }
        });
        if(findedUser?.id) {
            return findedUser;
        };
        return null;
    }

    async searchUsers(value: string): Promise<User[]> {
        console.log('searchUsers',value);
        if(!value) {
            return [];
        };
        const users = await this.userRepository.findAll({
            where: {
                [Op.or]: [
                    { email: { [Op.iLike]: `%${value}%` } },
                    { nickname: { [Op.iLike]: `%${value}%` } },
                    { firstName: { [Op.iLike]: `%${value}%` } },
                    { lastName: { [Op.iLike]: `%${value}%` } },
                    { phoneNumber: { [Op.iLike]: `%${value}%` } },
                    { phoneNumberSecond: { [Op.iLike]: `%${value}%` } },
                ],
            },
            include: { all: true },
        });
    
        return users;
    }
}




