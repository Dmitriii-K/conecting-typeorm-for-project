import { Module } from "@nestjs/common";
import { TestingController } from "./api/testing.controller";
import { TestingService } from "./application/testing.typeorm.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/domain/user.typeorm.entity";
import { Session } from "../sessions/domain/session.typeorm.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Session])
    ],
    controllers: [TestingController],
    providers: [TestingService],
    exports: []
})
export class TestingsModule {
}