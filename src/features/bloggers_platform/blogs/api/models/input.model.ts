import { IsNotEmpty, IsString, Length, Matches, MaxLength } from "class-validator";
import { Trim } from "src/infrastructure/decorators/transform/trim";

export class BlogInputModel {
    @IsString()
    @Trim()
    @IsNotEmpty()
    @MaxLength(15)
    name: string;

    @IsString()
    @Trim()
    @IsNotEmpty()
    @MaxLength(500)
    description: string;

    @IsString()
    @Trim()
    @IsNotEmpty()
    @Matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    @Length(1,100)
    websiteUrl: string;
}

export class BlogPostInputModel {
    @IsString()
    @Trim()
    @IsNotEmpty()
    @MaxLength(30)
    title: string;

    @IsString()
    @Trim()
    @IsNotEmpty()
    @MaxLength(100)
    shortDescription: string;

    @IsString()
    @Trim()
    @IsNotEmpty()
    @MaxLength(1000)
    content: string;
}