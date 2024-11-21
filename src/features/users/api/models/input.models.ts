import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { Trim } from "src/infrastructure/decorators/transform/trim";
import { EmailIsExist } from "src/infrastructure/decorators/validate/email-is-exist.decorator";
import { LoginIsExist } from "src/infrastructure/decorators/validate/login-is-exist.decorator";

export class TypeUserPagination {
    @ApiProperty()
    searchLoginTerm: string;
    @ApiProperty()
    searchEmailTerm: string;
    @ApiProperty()
    sortBy: string;
    @ApiProperty()
    sortDirection: string;
    @ApiProperty()
    pageNumber: number;
    @ApiProperty()
    pageSize: number;
}

export class UserInputModel {
    @ApiProperty()
    @IsString()
    @Trim()
    @IsNotEmpty()
    @Length(3,10)
    @Matches(/^[a-zA-Z0-9_-]*$/)
    @LoginIsExist()// в идеале проверять в BLL
    login: string;

    @ApiProperty()
    @IsString()
    @Trim()
    @IsNotEmpty()
    @Length(6,20)
    password: string;

    @ApiProperty()
    @IsString()
    @Trim()
    @IsNotEmpty()
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    @IsEmail()
    @EmailIsExist()// в идеале проверять в BLL
    email: string;
}