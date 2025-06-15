import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PriceListCategory } from './priceListCategory.model';
import { CreatePriceCategoryDto } from './dto/CreatePriceCategoryDto.dto';
import { UniqueConstraintError } from 'sequelize';
import { EventNameEnum, TransportGateway } from 'src/gateway/gateway';

// import { CreatePriceCategoryDto } from './dto/create-price-category.dto';
// import { UpdatePriceCategoryDto } from './dto/update-price-category.dto';

@Injectable()
export class PriceListCategoryService {

  private readonly logger = new Logger(PriceListCategoryService.name);

  constructor(
    @InjectModel(PriceListCategory)
    private priceCategoryRepository: typeof PriceListCategory,
    private gateway: TransportGateway
  ) { }

  async create(createPriceCategoryDto: CreatePriceCategoryDto): Promise<PriceListCategory> {
    const { name } = createPriceCategoryDto; // Извлекаем имя из DTO

    try {
      // Пытаемся создать новую запись в таблице 'price_categories'
      // Передаем объект с полями, которые нужно заполнить (в данном случае только 'name')
      const newCategory = await this.priceCategoryRepository.create({
        name: name,
      });

      this.logger.log(`Успешно создана категория с ID: ${newCategory.id} и именем: "${name}"`);
      return newCategory; // Возвращаем созданный объект категории

    } catch (error) {
      // Проверяем, является ли ошибка ошибкой нарушения уникального ограничения
      if (error instanceof UniqueConstraintError) {
        // Если да, значит категория с таким именем уже существует
        this.logger.warn(`Попытка создать категорию с существующим именем: "${name}"`);
        throw new ConflictException(
          `Категория прайс-листа с названием "${name}" уже существует.`
        );
      } else {
        // Если произошла другая ошибка при работе с БД
        this.logger.error(`Не удалось создать категорию с именем "${name}". Ошибка: ${error.message}`, error.stack);
        throw new InternalServerErrorException(
          'Произошла внутренняя ошибка сервера при создании категории.'
        );
      }
    }
  }

  async findAll(): Promise<PriceListCategory[]> {
    // Логика получения всех категорий (возможно с items через include)
    return this.priceCategoryRepository.findAll({ include: { all: true } }); // Пример с include
  }

  async delete(id: number): Promise<any> {
    const priceCategory = await this.priceCategoryRepository.findOne({ where: { id: id }, include: { all: true } });

    if (priceCategory) {
      await priceCategory.destroy();
      this.gateway.emit(EventNameEnum.OnPriceListUpdate, priceCategory);
      return priceCategory;
    };
    throw new HttpException('priceCategory not found', HttpStatus.NOT_FOUND);
  }
}