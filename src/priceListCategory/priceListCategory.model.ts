import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType, HasMany, PrimaryKey, AutoIncrement, Unique } from 'sequelize-typescript';
import { PriceListItem } from 'src/priceListItem/priceListItem.model';


@Table({ tableName: 'price_categories', timestamps: true, comment: 'Категории прайс-листа' })
export class PriceListCategory extends Model<PriceListCategory> {

  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор категории (автоматически генерируемый)',
    readOnly: true, // Указываем, что это поле только для чтения в API
  })
  @PrimaryKey
  @AutoIncrement // PostgreSQL будет сам генерировать ID
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: 'Первичный ключ, автоинкремент',
  })
  id: number;

  @ApiProperty({
    example: 'Малогабаритные грузоперевозки с маркетплейсов Адлер - Сухум (сборным грузом)',
    description: 'Название категории прайс-листа',
    required: true,
    uniqueItems: true, // Названия категорий должны быть уникальными
  })
  @Unique // Обеспечиваем уникальность на уровне БД
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Уникальное название категории',
  })
  name: string;

  // Определение связи "один ко многим"
  // Это поле не будет колонкой в БД, но нужно для Sequelize и Swagger
  @ApiProperty({
    type: () => [PriceListItem], // Указываем тип массива связанных элементов для Swagger
    description: 'Список позиций прайс-листа в данной категории',
    required: false, // Может быть пустым при создании/чтении категории
  })
  @HasMany(() => PriceListItem) // Указываем Sequelize на связь
  items: PriceListItem[];

  // Sequelize автоматически добавит createdAt и updatedAt, если timestamps: true
  @ApiProperty({ description: 'Дата создания записи', readOnly: true })
  createdAt: Date;

  @ApiProperty({ description: 'Дата последнего обновления записи', readOnly: true })
  updatedAt: Date;
}