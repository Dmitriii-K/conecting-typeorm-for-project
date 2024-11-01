// import { userPagination } from "src/base/models/user.models";
// import { TypeUserPagination } from "../api/models/input.models";
// import { PaginatorUserViewModel, UserViewModel } from "../api/models/output.models";
// import { InjectModel } from "@nestjs/mongoose";
// import { User, UserDocument, UserModelType } from "../domain/user.entity";
// import { Injectable } from "@nestjs/common";
// import { IUserQueryRepository } from "../api/models/interface";

// @Injectable()
// export class UserQueryRepository /*implements IUserQueryRepository */{
//     constructor(@InjectModel(User.name) private userModel: UserModelType) {}

//     async getUserById(userId: string) {
//         const user = await this.userModel.findOne({ _id: userId });
//         if (!user) {
//             return null;
//         }
//         return this.mapUser(user);
//     }
//     async getAllUsers(sortData: TypeUserPagination): Promise<PaginatorUserViewModel> {
//         const queryParams = userPagination(sortData);
//         const searchEmail = sortData.searchEmailTerm
//             ? { email: { $regex: sortData.searchEmailTerm, $options: "i" } }
//             : {};
//         const searchLogin = sortData.searchLoginTerm
//             ? { login: { $regex: sortData.searchLoginTerm, $options: "i" } }
//             : {};

//         const filter = { $or: [searchLogin, searchEmail] };
//         const items: UserDocument[] = await this.userModel
//             .find(filter)
//             .sort({ [queryParams.sortBy]: queryParams.sortDirection })
//             .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
//             .limit(queryParams.pageSize)
//             .exec();
//         const totalCount = await this.userModel.countDocuments(filter);
//         const newUser: PaginatorUserViewModel = {
//             pagesCount: Math.ceil(totalCount / queryParams.pageSize),
//             page: queryParams.pageNumber,
//             pageSize: queryParams.pageSize,
//             totalCount,
//             items: items.map(this.mapUser),
//         };
//         return newUser;
//     }
//     mapUser(user: UserDocument): UserViewModel {
//         return {
//             id: user.id,
//             login: user.login,
//             email: user.email,
//             createdAt: user.createdAt.toISOString(),
//         };
//     }
// }