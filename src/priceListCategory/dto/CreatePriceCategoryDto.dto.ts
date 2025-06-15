import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'; // Импортируем валидаторы

export class CreatePriceCategoryDto {

  @ApiProperty({
    example: 'Грузоперевозки до 3 тонн (индивидуальная поездка)', // Пример значения для Swagger
    description: 'Название новой категории прайс-листа. Должно быть уникальным.', // Описание для Swagger
    required: true, // Указываем Swagger, что поле обязательно в теле запроса
    minLength: 3,   // Минимальная длина (для документации)
    maxLength: 255, // Максимальная длина (для документации)
  })
  @IsString({ message: 'Название категории должно быть строкой' }) // Валидация: должно быть строкой
  @IsNotEmpty({ message: 'Название категории не может быть пустым' }) // Валидация: не должно быть пустым
  @MinLength(3, { message: 'Название категории должно содержать хотя бы 3 символа' }) // Валидация: мин. длина
  @MaxLength(255, { message: 'Название категории не может превышать 255 символов' }) // Валидация: макс. длина
  readonly name: string; // Используем readonly для неизменяемости после создания объекта DTO

}