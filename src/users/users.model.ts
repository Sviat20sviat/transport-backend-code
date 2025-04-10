import { ApiProperty } from "@nestjs/swagger";
import { AutoIncrement, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName:"users"})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: "Unique ID"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: "Chat ID"})
    @Column({type: DataType.BIGINT, allowNull: true})
    chatId: number;

    @ApiProperty({example: 'mail@mail.com', description: "Email"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'true', description: "is Authorized User"})
    @Column({type: DataType.BOOLEAN, allowNull: true})
    isAuthorized: boolean;

    @ApiProperty({example: 'Alex', description: "First Name"})
    @Column({type: DataType.STRING, allowNull: true})
    firstName: string;

    @ApiProperty({example: 'Hirsh', description: "Last Name"})
    @Column({type: DataType.STRING, allowNull: true})
    lastName: string;

    @ApiProperty({example: 'nickname', description: "nickname"})
    @Column({type: DataType.STRING, allowNull: true})
    nickname: string;

    @ApiProperty({example: '+743534543', description: "Phone number"})
    @Column({type: DataType.STRING, allowNull: true})
    phoneNumber: string;

    @ApiProperty({example: '+743534543', description: "Phone number 2"})
    @Column({type: DataType.STRING, allowNull: true})
    phoneNumberSecond: string;

    @ApiProperty({example: '123123', description: "Pass"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: true, description: "is Banned"})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: "Спам", description: "Banned reason"})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @ApiProperty({example: "Постоянный", description: "status"})
    @Column({type: DataType.STRING, allowNull: true})
    status: string;

    @ApiProperty({example: "Пушкинская, 10", description: "Избранные адреса"})
    @Column({type: DataType.ARRAY(DataType.TEXT), allowNull: false, defaultValue: []})
    favoriteAddresses: string[];

    @ApiProperty({example: 1200, description: "Баланс пользователя"})
    @Column({type: DataType.BIGINT, allowNull: false, defaultValue: 0,})
    balance: number;

    ///////

    @ApiProperty({example: "Постоянный", description: "inn"})
    @Column({type: DataType.TEXT, allowNull: true})
    inn: string;

    @ApiProperty({example: "Постоянный", description: "kpp"})
    @Column({type: DataType.TEXT, allowNull: true})
    kpp: string;

    @ApiProperty({example: "Постоянный", description: "ogrn"})
    @Column({type: DataType.TEXT, allowNull: true})
    ogrn: string;

    @ApiProperty({example: "Постоянный", description: "ocpo"})
    @Column({type: DataType.TEXT, allowNull: true})
    ocpo: string;

    @ApiProperty({example: "Постоянный", description: "ocpo"})
    @Column({type: DataType.TEXT, allowNull: true})
    bic: string;

    @ApiProperty({example: "Постоянный", description: "bankAccount"})
    @Column({type: DataType.TEXT, allowNull: true})
    bankAccount: string;

    @ApiProperty({example: "Постоянный", description: "userBankAccount"})
    @Column({type: DataType.TEXT, allowNull: true})
    userBankAccount: string;

    @ApiProperty({example: "Постоянный", description: "registrationAddress"})
    @Column({type: DataType.TEXT, allowNull: true})
    registrationAddress: string;

    
    @ApiProperty({example: "Постоянный", description: "realAddress"})
    @Column({type: DataType.TEXT, allowNull: true})
    realAddress: string;
    ///////


    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Post, 'userId')
    posts: Post[]

    @HasMany(() => Post, 'customerId')
    selectedPosts: Post[]

    @HasMany(() => Post, 'driverId')
    selectedByDriverPosts: Post[]
}