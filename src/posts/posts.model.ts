import { ApiProperty } from "@nestjs/swagger";
import { AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { User } from "src/users/users.model";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
    status: number;
}

@Table({tableName:"posts"})
export class Post extends Model<Post, PostCreationAttrs> {
    @ApiProperty({example: '1', description: "Unique ID"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'some title', description: "Title"})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    title: string;

    @ApiProperty({example: 'content', description: "Content"})
    @Column({type: DataType.TEXT, allowNull: false})
    content: string;

    @ApiProperty({example: 'Одесса, Филатова 18', description: "Address From"})
    @Column({type: DataType.TEXT, allowNull: false})
    addressFrom: string;

    @ApiProperty({example: 'Москва, проспект Ленина 24', description: "Address To"})
    @Column({type: DataType.TEXT, allowNull: false})
    addressTo: string;

    @ApiProperty({example: '1', description: "Status"})
    @Column({type: DataType.INTEGER, allowNull: false})
    status: number;

    @ApiProperty({example: 'image.png', description: "Image"})
    @Column({type: DataType.STRING})
    image: string;

    @ApiProperty({example: 12323, description: "Price"})
    @Column({type: DataType.BIGINT})
    price: number;

    @ApiProperty({example: 12323, description: "Paid"})
    @Column({type: DataType.BIGINT})
    paid: number;
    
    @ApiProperty({example: 10, description: "Commission"})
    @Column({type: DataType.BIGINT})
    commission: number;

    @ApiProperty({example: 12323, description: "Summ"})
    @Column({type: DataType.BIGINT})
    summ: number;

    @ApiProperty({example: 'slfksdkfn', description: "Post Naming"})
    @Column({type: DataType.TEXT, allowNull: true})
    postNaming: string;

    @ApiProperty({example: 'Склад Озон', description: "На склад"})
    @Column({type: DataType.TEXT, allowNull: true})
    warehouse: string;

    @ApiProperty({example: 123, description: "DriverId"})
    @Column({type: DataType.INTEGER})
    driverId: number;


    // @Column({type: DataType.INTEGER})
    // customerId: number;

    @ApiProperty({example: 1, description: "cargoStatus"})
    @Column({type: DataType.INTEGER})
    cargoStatus: number;

    @ApiProperty({example: 123211, description: "deliveryDate"})
    @Column({type: DataType.TIME})
    deliveryDate: number;


    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User, 'userId')
    author: User;

    @ApiProperty({example: 123, description: "customerId"})
    @ForeignKey(() => User)
    @Column
    customerId: number;
  
    @BelongsTo(() => User, 'customerId')
    customer: User;
}