import { Controller, Delete, HttpCode } from "@nestjs/common";
import { TestingService } from "../application/testing.sql.service";


@Controller('testing')
export class TestingController {
    constructor(private readonly testingService: TestingService) {}

    @Delete('all-data')
    @HttpCode(204)
    async deleteAllData(): Promise<void> {
    await this.testingService.deleteAllData();
    }
}
