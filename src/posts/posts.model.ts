import { ApiProperty } from "@nestjs/swagger";
import { AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { User } from "src/users/users.model";
import { Document } from "src/documents/documents.model";

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

    @ApiProperty({example: 1, description: "cargoStatus"})
    @Column({type: DataType.INTEGER})
    cargoStatus: number;

    @ApiProperty({example: 123211, description: "deliveryDate"})
    @Column({type: DataType.TIME})
    deliveryDate: number;

    @ApiProperty({example: 'Доставка до ПВЗ', description: "Delivery Type"})
    @Column({type: DataType.TEXT, allowNull: true})
    deliveryType: string;

    @ApiProperty({example: 'asd323wt43f34tt3er', description: "Track Code"})
    @Column({type: DataType.TEXT, allowNull: true})
    trackCode: string;

    @ApiProperty({example: '1212323323', description: "Order Number"})
    @Column({type: DataType.STRING, allowNull: true})
    orderNumber: string;

    @ApiProperty({example: 'SomeComment', description: "Cargo Pickup Comment"})
    @Column({type: DataType.TEXT, allowNull: true})
    cargoPickupComment: string;

    @ApiProperty({example: 'груз холодильник', description: "cargoCharacter"})
    @Column({type: DataType.TEXT, allowNull: true})
    cargoCharacter: string;

    @ApiProperty({example: 'comment', description: "cargoCharacterComment"})
    @Column({type: DataType.TEXT, allowNull: true})
    cargoCharacterComment: string;

    @ApiProperty({example: '12*12*20', description: "cargoCharacterSize"})
    @Column({type: DataType.TEXT, allowNull: true})
    cargoCharacterSize: string;

    @ApiProperty({example: 2860, description: "cargoCharacterSizeAll"})
    @Column({type: DataType.BIGINT, allowNull: true})
    cargoCharacterSizeAll: number;

    @ApiProperty({example: 'comment', description: "cargoCharacterWeight"})
    @Column({type: DataType.STRING, allowNull: true})
    cargoCharacterWeight: string;

    @ApiProperty({example: false, description: "isFragile"})
    @Column({type: DataType.BOOLEAN, allowNull: true})
    isFragile: boolean;

    @ApiProperty({example: 'Иванов Иван Ильич', description: "additionalContactFullName"})
    @Column({type: DataType.TEXT, allowNull: true})
    additionalContactFullName: string;

    @ApiProperty({example: '+7940 000 00 00', description: "additionalContactPhone"})
    @Column({type: DataType.TEXT, allowNull: true})
    additionalContactPhone: string;

    @ApiProperty({example: '+7940 000 00 00', description: "additionalContactPhone"})
    @Column({type: DataType.TEXT, allowNull: true})
    additionalContactPhoneSec: string;

    @ApiProperty({example: 'COMMENT!!', description: "additionalComment"})
    @Column({type: DataType.TEXT, allowNull: true})
    additionalComment: string;

    @ApiProperty({example: 'Иванов Иван Ильич', description: "additionalContactFullName"})
    @Column({type: DataType.TEXT, allowNull: true})
    additionalRecipientFullName: string;

    @ApiProperty({example: '+7940 000 00 00', description: "additionalContactPhone"})
    @Column({type: DataType.TEXT, allowNull: true})
    additionalRecipientPhone: string;


    @ApiProperty({example: 'COMMENT!!', description: "additionalComment"})
    @Column({type: DataType.TEXT, allowNull: true})
    additionalRecipientComment: string;

    @ApiProperty({example: 'COMMENT!!', description: "additionalComment"})
    @Column({type: DataType.TEXT, allowNull: true})
    additionalFloor: string;

    @ApiProperty({example: 'COMMENT!!', description: "additionalComment"})
    @Column({type: DataType.BOOLEAN, allowNull: true})
    additionalFriagle: boolean;



    // @Column({
    //     type: DataType.JSONB, // Поле для хранения массива объектов
    //     allowNull: true,
    // })
    // products: { 
    //     id: number; 
    //     name: string;
    //     desc: string;
    //     addressFrom: string;
    //     addressTo: string;
    //     warehouse: string;
    //     deliveryType: string;
    //     productNum: string;
    //     productCode: string;
    //     productComment: string;
    //     productCharacter: string;
    //     productCharacterComment: string;
    //     productDimensions: string;
    //     allProductDimensions: string;
    //     isProductFragile: string;
    //     weight: string;
    // }[]; // Массив объектов


    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    driverId: number;
    @BelongsTo(() => User, 'driverId')
    driver: User;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
    @BelongsTo(() => User, 'userId')
    author: User;

    @ApiProperty({example: 123, description: "customerId"})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    customerId: number;
    @BelongsTo(() => User, 'customerId')
    customer: User;

    
    // @HasMany(() => require('src/documents/documents.model').Document, 'postBasisId')
    // documents?: Document[]
}