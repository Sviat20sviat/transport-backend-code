import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString, Length } from "class-validator";

export class updateUserDto {
    @ApiProperty({example: '232323', description: "Id"})
    readonly id: string;

    @ApiProperty({example: 'mail@mail.com', description: "Email"})
    @IsString({message: "Must be a string"})
    @IsEmail({}, {message: "Must be an email"})
    readonly email: string;

    @ApiProperty({example: 'Alex', description: "firstName"})
    @IsString({message: "Must be a string"})
    readonly firstName: string;

    @ApiProperty({example: 'Hirsh', description: "lastName"})
    @IsString({message: "Must be a string"})
    readonly lastName: string;

    @ApiProperty({example: 'nickname', description: "nickname"})
    @IsString({message: "Must be a string"})
    readonly nickname: string;

    @ApiProperty({example: '+123423423', description: "Phone"})
    readonly phoneNumber: string;

    @ApiProperty({example: '+123423423', description: "Phone Second"})
    readonly phoneNumberSecond?: string;

}