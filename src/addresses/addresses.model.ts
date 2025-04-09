import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";


interface AddressCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
    status: number;
}

@Table({ tableName: "addresses", timestamps: true })
export class Address extends Model<Address, AddressCreationAttrs> {

    @ApiProperty({ example: '1', description: "Unique ID" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'ООО ГРУЗОПЕРЕВОЗКИ АСЛАН', description: 'Название организации' })
    @Column({
        type: DataType.TEXT,
        allowNull: true,
        comment: 'Название организации',
    })
    organization: string;

    @ApiProperty({ example: 'Центральный', description: 'Район' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: 'Район',
    })
    district: string;

    @ApiProperty({ example: 'Иван Иванов', description: 'Имя ответственного лица' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: 'Имя ответственного лица',
    })
    name: string;

    @ApiProperty({ example: 'г. Москва, ул. Ленина, д. 10', description: 'Адрес' })
    @Column({
        type: DataType.TEXT,
        allowNull: true,
        comment: 'Адрес',
    })
    address: string;

    @ApiProperty({ example: 'строение 2', description: 'Строение' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: 'В Здании /обособлени',
    })
    build: string;

    @ApiProperty({ example: 1, description: 'В здании' })
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        comment: 'В Здании /обособлени',
        defaultValue: 1
    })
    location: number;

    @ApiProperty({
        example: { type: 'Point', coordinates: [37.6173, 55.7558] },
        description: 'Координаты',
    })
    @Column({
        type: DataType.ARRAY(DataType.FLOAT),
        allowNull: true,
        comment: 'Координаты',
    })
    coordinates: Array<number>;

    @ApiProperty({ example: '+7 (999) 123-45-67', description: 'Телефон' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: 'Телефон',
    })
    phone: string;

    @ApiProperty({ example: 'Действующий', description: 'Статус адреса' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: 'Статус адреса',
    })
    addressStatus: string;

    @ApiProperty({ example: 1, description: 'Статус адреса' })
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 1,
        comment: 'Статус адреса',
    })
    addressStatusId: number;

    @ApiProperty({ example: 'Нужна доставка в выходные', description: 'Комментарий' })
    @Column({
        type: DataType.TEXT,
        allowNull: true,
        comment: 'Комментарий',
    })
    comment: string;

    @ApiProperty({ example: 1, description: 'Тип адреса. 1 - внутренний, 2 - внешний' })
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        comment: 'Комментарий',
    })
    addressType: number;

    @HasMany(() => Post, 'addressFromId')
    postsFrom: Post[];

    @HasMany(() => Post, 'addressToId')
    postsTo: Post[]
}