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