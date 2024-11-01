import { Module } from "@nestjs/common";
import { SessionController } from "./api/session.controller";
import { SessionsService } from "./application/session.service";
import { SessionsQueryRepository } from "./repository/session.sql.query-repository";
import { SessionRepository } from "./repository/session.sql.repository";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [
        UsersModule
    ],
    controllers: [SessionController],
    providers: [SessionsService, SessionRepository, SessionsQueryRepository],
    exports: [SessionRepository]
})
export class SessionsModule {}