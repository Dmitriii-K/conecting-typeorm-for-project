import { Module } from "@nestjs/common";
import { TestingController } from "./api/testing.controller";
import { TestingService } from "./application/testing.sql.service";

@Module({
    imports: [],
    controllers: [TestingController],
    providers: [TestingService],
    exports: []
})
export class TestingsModule {
}