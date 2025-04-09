import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
// import { Organization } from './organization.model';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './addresses.model';
import { EditAddressDto } from './dto/edit-address.dto';
import { GetFilteredDto } from './dto/get-filteder.dto';
import { Op } from 'sequelize';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address) private addressRepository: typeof Address,
  ) {}

  // Создание записи
  async create(dto: CreateAddressDto): Promise<Address> {
    const address = await this.addressRepository.create(dto);
    return address;
  }

  // Редактирование записи
  async edit(id: number, dto: EditAddressDto): Promise<Address> {
    const address = await this.addressRepository.findOne({where: {id}, include: {all: true}});
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    await address.update(dto);
    return address;
  }

  // Получение записи по ID
  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({where: {id}, include: {all: true}});
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return address;
  }

  // Удаление записи
  async delete(id: number): Promise<void> {
    const address = await this.addressRepository.findOne({where: {id}, include: {all: true}});
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    await address.destroy();
  }

  async findAll(): Promise<Address[]> {
    const addresses = await this.addressRepository.findAll({include: {all: true}, order: [['updatedAt', 'DESC']],});
    if (!addresses) {
      throw new NotFoundException(`NO ANY ADDRESSES not found`);
    }
    return addresses;
  }

  async getFiltered(getFilteredDto: GetFilteredDto): Promise<Address[]> {
    const where: any = {};
  
    if (getFilteredDto.organization) {
      where.organization = { [Op.iLike]: `%${getFilteredDto.organization}%` };
    }
    if (getFilteredDto.district) {
      where.district = { [Op.iLike]: `%${getFilteredDto.district}%` };
    }
    if (getFilteredDto.name) {
      where.name = { [Op.iLike]: `%${getFilteredDto.name}%` };
    }
    if (getFilteredDto.address) {
      where.address = { [Op.iLike]: `%${getFilteredDto.address}%` };
    }
    if (getFilteredDto.phone) {
      where.phone = { [Op.iLike]: `%${getFilteredDto.phone}%` };
    }
    if (getFilteredDto.location) {
      where.location = { [Op.iLike]: `%${getFilteredDto.location}%` };
    }
  
    // Фильтрация по статусу адреса
    if (getFilteredDto.addressStatusId) {
      where.addressStatusId = getFilteredDto.addressStatusId;
    }
  
    // Фильтрация по координатам (предполагается, что location хранится как строка)
    if (getFilteredDto.location) {
      where.location = getFilteredDto.location;
    }

    if (getFilteredDto.addressType) {
      where.addressType = getFilteredDto.addressType;
    }
  
    // Фильтрация по дате создания
    if (getFilteredDto.createdAt) {
      const { fromTime, toTime } = getFilteredDto.createdAt;
      if (fromTime && toTime) {
        where.createdAt = {
          [Op.between]: [new Date(fromTime), new Date(toTime)],
        };
      } else if (fromTime) {
        where.createdAt = {
          [Op.gte]: new Date(fromTime),
        };
      } else if (toTime) {
        where.createdAt = {
          [Op.lte]: new Date(toTime),
        };
      }
    }
  
    // Выполнение запроса к базе данных
    const addresses = await this.addressRepository.findAll({
      where,
      include: { all: true },
      order: [['updatedAt', 'DESC']],
    });
  
    // Проверка на отсутствие результатов
    if (!addresses) {
      throw new NotFoundException(`No addresses found matching the criteria`);
    }
  
    return addresses;
  }
}