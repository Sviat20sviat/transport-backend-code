import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.model';
import { Post } from 'src/posts/posts.model';

@Table({
    tableName: 'documents', // Укажите имя таблицы
    timestamps: true, // Автоматическое добавление createdAt и updatedAt
})

export class Document extends Model<Document> {
    @ApiProperty({ example: 3743, description: 'Уникальный идентификатор записи' })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    })
    id: number;

    @ApiProperty({ example: 'Болгария', description: 'Адрес отправления' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: 'Адрес отправления',
    })
    addressFrom: string;

    @ApiProperty({ example: 'Сухум', description: 'Адрес получения' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: 'Адрес получения',
    })
    addressTo: string;


    @ApiProperty({ example: 'Комментарий', description: 'Комментарий к записи' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    comment: string;

    @ApiProperty({ example: 1, description: 'Тип документа' })
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    docType: number;

    @ApiProperty({ example: 2200, description: 'Сумма' })
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    sum: number;


    @ApiProperty({ example: false, description: 'Системная ли запись' })
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    })
    isSystem: boolean;

    @ApiProperty({ example: 1190, description: 'Баланс пользователя перед Операцией' })
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    userBalanseBefore: number;

    @ApiProperty({ example: 1190, description: 'Баланс пользователя после Операции' })
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    userBalanseAfter: number;


    @ApiProperty({ example: 31233, description: 'ID клиента' })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    clientId: number;
    @BelongsTo(() => User, 'clientId')
    client: User;


    @ApiProperty({ example: 4322, description: 'ID получателя' })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    recipientId: number;
    @BelongsTo(() => User, 'recipientId')
    recipient: User;


    @ApiProperty({ example: 1, description: 'ID основания заказа' })
    @ForeignKey(() => Post)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    postBasisId: number;
    @BelongsTo(() => Post, 'postBasisId')
    postBasis: Post;


    @ApiProperty({ example: 1, description: 'ID документа основания' })
    @ForeignKey(() => Document)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    documentBasisId: number;
    @BelongsTo(() => Document, 'documentBasisId')
    documentBasis: Document;
}
