import { Column, Model, Table, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.model';
import { Post } from 'src/posts/posts.model';

@Table({ tableName: 'warehouses', timestamps: true })
export class Warehouse extends Model<Warehouse> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty({ description: 'Уникальный идентификатор склада', example: 1 })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ description: 'Адрес склада', example: 'ул. Примерная, 1' })
  address: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  @ApiProperty({
    description: 'Координаты склада',
    example: { lat: 55.7558, lng: 37.6173 },
  })
  coordinates: {
    lat: number;
    lng: number;
  };

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @ApiProperty({ description: 'Номер телефона склада', example: '+79991234567' })
  phoneNumber: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  @ApiProperty({ description: 'Идентификатор руководителя склада', example: 1 })
  supervisorId: number;

  @BelongsTo(() => User)
  supervisor: User;

  @HasMany(() => Post)
  posts: Post[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ description: 'Название склада', example: 'Склад 1' })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'active',
  })
  @ApiProperty({ description: 'Статус склада', example: 'active' })
  status: string;

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: true,
  })
  @ApiProperty({ description: 'Идентификаторы работников склада', example: [1, 2, 3] })
  workerIds: number[];
}