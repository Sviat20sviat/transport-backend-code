import { Body, Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AddressService } from "./addresses.service";
import { createPostDto } from "src/posts/dto/create-post.dto";
import { CreateAddressDto } from "./dto/create-address.dto";
import { GetFilteredDto } from "./dto/get-filteder.dto";
import { Address } from "./addresses.model";
import { DeleteAddressDto } from "./dto/delete-address.dto";
import { EditAddressDto } from "./dto/edit-address.dto";

@ApiTags('Addresses')
@Controller('addresses')
export class AddressesController {

    constructor(
        private addressesService: AddressService
    ) { }

    @ApiOperation({summary: "Create Address"})
    @ApiResponse({status: 200, type: Object})
    @ApiBody({type: CreateAddressDto})
    @Post('/create')
    create(@Body() addressDto: CreateAddressDto) {
        return this.addressesService.create(addressDto);
    }

    @ApiOperation({summary: "Get Filtered"})
    @ApiResponse({status: 200, type: Array<Address>})
    @ApiBody({type: GetFilteredDto})
    @Post('/getFiltered')
    getFiltered(@Body() addressDto: GetFilteredDto) {
        return this.addressesService.getFiltered(addressDto);
    }

    @ApiOperation({summary: "Get All"})
    @ApiResponse({status: 200, type: Object})
    @Get('/all')
    getAll() {
        return this.addressesService.findAll();
    }

    @ApiOperation({summary: "Delete"})
    @ApiResponse({status: 200, type: Object})
    @ApiBody({type: DeleteAddressDto})
    @Post('/delete')
    delete(@Body() addressDto: DeleteAddressDto) {
        return this.addressesService.delete(addressDto.id);
    }

    @ApiOperation({summary: "Update"})
    @ApiResponse({status: 200, type: Object})
    @ApiBody({type: DeleteAddressDto})
    @Post('/update/:id')
    update(@Param('id') id: number,@Body() addressDto: EditAddressDto) {
        return this.addressesService.edit(id, addressDto);
    }
}