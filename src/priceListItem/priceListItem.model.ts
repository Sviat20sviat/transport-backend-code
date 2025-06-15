import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo, AllowNull, Default } from 'sequelize-typescript';
import { PriceListCategory } from 'src/priceListCategory/priceListCategory.model';


@Table({ tableName: 'price_items', timestamps: true, comment: 'Позиции прайс-листа' })
export class PriceListItem extends Model<PriceListItem> {

  // Используем ID из вашего примера как первичный ключ.
  // Убедитесь, что эти ID действительно уникальны по всем позициям.
  // Если нет, лучше использовать автоинкрементный ID, как в PriceCategory.
  @ApiProperty({ example: '1', description: "Unique ID" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: 'До 4.5 литр. до 2кг',
    description: 'Название или описание позиции прайс-листа',
    required: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Название/описание позиции',
  })
  name: string;

  @ApiProperty({
    example: 45,
    description: 'Сумма комиссии (если применимо)',
    required: false, // Комиссия может быть не у всех позиций
    default: 0,      // Значение по умолчанию, если не указано
    nullable: true,  // Может быть NULL в БД
  })
  @AllowNull(true) // Разрешаем NULL в БД
  @Default(0)      // Значение по умолчанию в БД
  @Column({
    type: DataType.INTEGER, // Используйте DataType.FLOAT или DataType.DECIMAL(10, 2) если нужна точность
    comment: 'Комиссия',
  })
  commission: number;

  @ApiProperty({
    example: 300,
    description: 'Полная сумма/стоимость позиции',
    required: true,
  })
  @Column({
    type: DataType.INTEGER, // Используйте DataType.FLOAT или DataType.DECIMAL(10, 2) если нужна точность
    allowNull: false,
    comment: 'Стоимость',
  })
  sum: number;

  // Внешний ключ для связи с PriceCategory
  @ApiProperty({
    example: 1,
    description: 'ID категории, к которой относится данная позиция',
    required: true,
  })
  @ForeignKey(() => PriceListCategory) // Указываем Sequelize на внешний ключ
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: 'Внешний ключ на таблицу price_categories',
  })
  categoryId: number;

  // Определение связи "многие к одному"
  // Это поле не будет колонкой в БД, но нужно для Sequelize и Swagger
  @ApiProperty({
    type: () => PriceListCategory, // Указываем тип связанного объекта для Swagger
    description: 'Объект связанной категории',
    required: false, // Обычно не требуется при создании/обновлении Item, т.к. есть categoryId
    readOnly: true, // Объект категории обычно получается через Eager Loading/Include
  })
  @BelongsTo(() => PriceListCategory) // Указываем Sequelize на связь
  category: PriceListCategory;

  // Sequelize автоматически добавит createdAt и updatedAt, если timestamps: true
  @ApiProperty({ description: 'Дата создания записи', readOnly: true })
  createdAt: Date;

  @ApiProperty({ description: 'Дата последнего обновления записи', readOnly: true })
  updatedAt: Date;
}