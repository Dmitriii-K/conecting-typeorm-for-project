import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/users-sql-repository";
import { User } from "../domain/user.sql.entity";

@Injectable()
export class UserService /*implements IUserService*/{
    constructor(private userRepository: UserRepository) {}

    async deleteUser(id: string) {
        return this.userRepository.deleteUser(id);
    }
    async validateUser(login: string, pass: string): Promise<User | null> {
        return this.userRepository.findOne(login);
    }
}