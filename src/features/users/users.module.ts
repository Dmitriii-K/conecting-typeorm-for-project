import { Module } from "@nestjs/common";
import { UserController } from "./api/users.controller";
import { UserService } from "./application/user.service";
import { UserRepository } from "./repository/users-sql-repository";
import { UserQueryRepository } from "./repository/users-sql-query-repository";
import { CqrsModule } from "@nestjs/cqrs";
import { AdaptersModule } from "src/infrastructure/adapters/adapters.module";
import { CreateUserUseCase } from "./application/use-cases/create-user";

@Module({
    imports: [CqrsModule, 
        AdaptersModule
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository, UserQueryRepository, CreateUserUseCase],
    exports: [UserRepository, UserService]
})
export class UsersModule {
}