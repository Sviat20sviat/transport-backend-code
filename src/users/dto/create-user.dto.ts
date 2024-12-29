import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class createUserDto {
    @ApiProperty({example: 'mail@mail.com', description: "Email"})
    @IsString({message: "Must be a string"})
    @IsEmail({}, {message: "Must be an email"})
    readonly email: string;
    @ApiProperty({example: '234234', description: "Password"})
    @IsString({message: "Must be a string"})
    @Length( 6, 16, {message: "Password must have 6-16 symbols length"})
    readonly password: string;
    @ApiProperty({example: 'nickname', description: "Nickname"})
    @IsString({message: "Must be a string"})
    readonly nickname: string;

    @ApiProperty({example: '+7123123123', description: "phoneNumber"})
    @IsString({message: "Must be a string"})
    readonly phoneNumber: string;

    @ApiProperty({example: '+7123123123', description: "phoneNumber"})
    @IsString({message: "Must be a string"})
    readonly phoneNumberSecond?: string;

    @ApiProperty({example: true, description: "isDriver"})
    readonly isDriver: boolean;

    @ApiProperty({example: 'Илья', description: "firstName"})
    @IsString({message: "Must be a string"})
    readonly firstName?: string;

    @ApiProperty({example: 'Илья', description: "firstName"})
    @IsString({message: "Must be a string"})
    readonly lastName?: string;

    @ApiProperty({example: [1,2], description: "Роли"})
    readonly roles?: Array<number>;

    ///

    
    @ApiProperty({example: 'Илья', description: "firstName"})
    readonly inn?: string;

    @ApiProperty({example: 'Илья', description: "firstName"})
    readonly kpp?: string;
    
    @ApiProperty({example: 'Илья', description: "firstName"})
    readonly ogrn?: string;
    
    @ApiProperty({example: 'Илья', description: "firstName"})
    readonly ocpo?: string;

    @ApiProperty({example: 'Илья', description: "firstName"})
    readonly bic?: string;
    
    @ApiProperty({example: 'Илья', description: "firstName"})
    readonly bankAccount?: string;
    
    @ApiProperty({example: 'Илья', description: "firstName"})
    readonly userBankAccount?: string;
    
    @ApiProperty({example: 'Илья', description: "firstName"})
    readonly registrationAddress?: string;
    
    @ApiProperty({example: 'Илья', description: "firstName"})
    readonly realAddress?: string;


    ///
}