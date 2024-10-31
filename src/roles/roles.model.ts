import { ApiProperty } from "@nestjs/swagger";
import { AutoIncrement, BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName:"roles"})
export class Role extends Model<Role, RoleCreationAttrs> {

    @ApiProperty({example: '1', description: "Unique ID"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Admin', description: "Role"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @ApiProperty({example: 'some descr', description: "Description"})
    @Column({type: DataType.STRING, allowNull: true})
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}