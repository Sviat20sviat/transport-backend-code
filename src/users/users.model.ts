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
    @Column({type: DataType.INTEGER, unique: false,})
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

    @ApiProperty({example: '123123', description: "Pass"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: true, description: "is Banned"})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: "Спам", description: "Banned reason"})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;


    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Post, 'userId')
    posts: Post[]

    @HasMany(() => Post, 'customerId')
    selectedPosts: Post[]
}