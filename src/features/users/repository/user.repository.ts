// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { User, UserDocument, UserModelType } from "../domain/user.entity";
// import { IUserRepository } from "../api/models/interface";
// import {WithId} from "mongodb"

// @Injectable()
// export class UserRepository /*implements IUserRepository*/{
//     constructor(@InjectModel(User.name) private userModel: UserModelType) {}

//     async insertUser(user: User) {
//         const saveResult = await this.userModel.create(user);
//         return saveResult._id.toString();
//     }
//     // async saveUser(user: User): Promise<User> {
//     //     return user.save();
//     // }
//     async findUserById(userId: string) {
//         const user = await this.userModel.findOne({ _id: userId });
//         if (!user) {
//             return null;
//         }
//         return user;
//     }
//     async findUserByMiddleware (id: string) : Promise<WithId<User> | null>{
//         const user = await this.userModel.findOne({_id: id});
//         if (!user) {
//             return null;
//         }
//         return user
//     }
//     async loginIsExist (login: string): Promise<boolean> {
//         return !!(await this.userModel.countDocuments({login: login}));
//     }
//     async emailIsExist (email: string): Promise<boolean> {
//         return !!(await this.userModel.countDocuments({email: email}));
//     }
//     async findUserByLogiOrEmail(data: { login: string, email: string }): Promise<User | null> {
//         return this.userModel.findOne({ $or: [{ login: data.login }, { email: data.email }] });
//     }
//     async deleteUser(userId: string) {
//         const user = await this.userModel.deleteOne({ _id: userId });
//         if (user.deletedCount === 1) {
//             return true;
//         }
//         return false;
//     }

//     async updateCode(userId: string, newCode: string) {
//         const result = await this.userModel.updateOne({ _id: userId }, { $set: { 'emailConfirmation.confirmationCode': newCode } });
//         return result.modifiedCount === 1;
//     }
//     async updatePassword(userId: string, pass: string) {
//         const result = await this.userModel.updateOne({ _id: userId }, { $set: { password: pass } });
//         return result.modifiedCount === 1;
//     }
//     async checkUserByRegistration(login: string, email: string): Promise<UserDocument | null> {
//         return this.userModel.findOne({ $or: [{ login: login }, { email: email }] });
//     }
//     async findUserByLoginOrEmail(loginOrEmail: string): Promise<UserDocument | null> {
//         return this.userModel.findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }] });
//     }
//     async createUser(user: User) {
//         const saveResult = await this.userModel.create(user);
//         return saveResult._id.toString();
//     }
//     async findUserByCode(code: string): Promise<UserDocument | null> {
//         return this.userModel.findOne({ "emailConfirmation.confirmationCode": code });
//     }
//     async findUserByEmail(mail: string): Promise<UserDocument | null> {
//         return this.userModel.findOne({ email: mail });
//     }
//     async findOne(login: string): Promise<any | null> {
//         return this.userModel.findOne({ login: login });
//     }
//     async updateConfirmation(_id: string) {
//         const result = await this.userModel.updateOne({ _id }, { $set: { 'emailConfirmation.isConfirmed': true } });
//         return result.modifiedCount === 1;
//     }
// }