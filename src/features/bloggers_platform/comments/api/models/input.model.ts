import { IsNotEmpty, IsString, Length } from "class-validator";
import { Trim } from "src/infrastructure/decorators/transform/trim";

export class CommentInputModel {
    @IsString()
    @Trim()
    @IsNotEmpty()
    @Length(20,300)
    content: string;
}