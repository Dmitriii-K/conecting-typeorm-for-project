import { User } from "../../domain/user.typeorm.entity";

export class UserViewModel {
    id: string;
    login: string;
    email: string;
    createdAt: Date;
}

export class PaginatorUserViewModel {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: UserViewModel[];
}

export function mapUser(user: User): UserViewModel {
    return {
        id: user.id,
        login: user.login,
        email: user.email,
        createdAt: user.createdAt,
    };
}