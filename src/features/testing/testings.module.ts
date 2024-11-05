import { Module } from "@nestjs/common";
import { TestingController } from "./api/testing.controller";
import { TestingService } from "./application/testing.typeorm.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/domain/user.typeorm.entity";
import { Session } from "../sessions/domain/session.typeorm.entity";
import { Blog } from "../bloggers_platform/blogs/domain/blog.typeorm.entity";
import { Post } from "../bloggers_platform/posts/domain/post.typeorm.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Session, Blog, Post])
    ],
    controllers: [TestingController],
    providers: [TestingService],
    exports: []
})
export class TestingsModule {
}