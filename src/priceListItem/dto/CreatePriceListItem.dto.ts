// Предполагаемое расположение: src/price-item/dto/create-price-item.dto.ts
// или src/priceListItem/dto/create-priceListItem.dto.ts (в зависимости от вашей структуры)

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsPositive,
  IsOptional,
  Min,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePriceListItemDto {

  // @ApiProperty({
  //   description: 'Уникальный ID для новой позиции прайс-листа (предоставляется клиентом)',
  //   example: 4, // Пример нового ID
  //   required: true,
  // })
  // @IsInt({ message: 'ID должен быть целым числом' })
  // @IsPositive({ message: 'ID должен быть положительным числом' })
  // @IsNotEmpty({ message: 'Необходимо предоставить ID' })
  // readonly id: number;

  @ApiProperty({
    description: 'Название или описание новой позиции',
    example: 'Псоу - Сухум',
    required: true,
    minLength: 2, // Пример ограничения
    maxLength: 255, // Пример ограничения
  })
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название не может быть пустым' })
  @MinLength(2, { message: 'Название должно содержать хотя бы 2 символа' }) // Пример валидации
  @MaxLength(255, { message: 'Название не должно превышать 255 символов' }) // Пример валидации
  readonly name: string;

  // Используем ApiPropertyOptional для необязательных полей
  @ApiPropertyOptional({
    description: 'Сумма комиссии (необязательно, по умолчанию будет 0 в БД)',
    example: 100,
    minimum: 0, // Комиссия не может быть отрицательной
    default: 0, // Указываем значение по умолчанию (информативно)
    nullable: true, // Указываем, что null допустим (информативно)
  })
  @IsOptional() // Поле не обязательно для валидации
  @IsInt({ message: 'Комиссия должна быть целым числом' })
  // @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Комиссия должна быть числом' }) // Альтернатива для FLOAT/DECIMAL
  @Min(0, { message: 'Комиссия не может быть отрицательной' })
  readonly commission?: number; // '?' делает поле необязательным в TypeScript

  @ApiProperty({
    description: 'Полная сумма/стоимость позиции',
    example: 1500,
    required: true,
    minimum: 0, // Сумма обычно не отрицательная
  })
  @IsInt({ message: 'Сумма должна быть целым числом' })
  // @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Сумма должна быть числом' }) // Альтернатива для FLOAT/DECIMAL
  @Min(0, { message: 'Сумма не может быть отрицательной' })
  @IsNotEmpty({ message: 'Необходимо указать сумму' }) // Гарантирует, что значение передано (не null/undefined)
  readonly sum: number;

  @ApiProperty({
    description: 'ID категории прайс-листа, к которой относится эта позиция',
    example: 1, // ID существующей категории
    required: true,
  })
  @IsInt({ message: 'ID категории должен быть целым числом' })
  @IsPositive({ message: 'ID категории должен быть положительным числом' })
  @IsNotEmpty({ message: 'Необходимо указать ID категории' })
  readonly categoryId: number;
}