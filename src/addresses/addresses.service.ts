import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
// import { Organization } from './organization.model';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './addresses.model';
import { EditAddressDto } from './dto/edit-address.dto';
import { GetFilteredDto } from './dto/get-filteder.dto';

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

    if(getFilteredDto.addressStatus) {
        where.addressStatus = getFilteredDto.addressStatus;
    };
    if(getFilteredDto.addressType) {
        where.addressType = getFilteredDto.addressType;
    };
    if(getFilteredDto.name) {
        where.name = getFilteredDto.name;
    };
    if(getFilteredDto.organization) {
        where.organization = getFilteredDto.organization;
    };
    const addresses = await this.addressRepository.findAll({where, include: {all: true}, order: [['updatedAt', 'DESC']],});
    if (!addresses) {
        throw new NotFoundException(`NO ANY ADDRESSES not found`);
      }
      return addresses;
  }
}