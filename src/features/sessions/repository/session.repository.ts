// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { Session, SessionModelType } from "../domain/session.entity";


// @Injectable()
// export class SessionRepository /*implements ICommentRepository*/{
//     constructor(@InjectModel(Session.name) private sessionModel: SessionModelType) {}

//     async deleteSessionById(deviceId: string) {
//         const result = await this.sessionModel.deleteOne({ device_id: deviceId });
//         return result.deletedCount === 1;
//     }
//     async deleteAllSessionsExceptCurrentOne(userId: string, device_id: string) {
//         const deleteAllDevices = await this.sessionModel.deleteMany({ user_id: userId, device_id: { $ne: device_id } });
//         return deleteAllDevices.deletedCount > 0;
//     }
//     async findSessionByMiddleware (deviceId: string) {
//         const user = await this.sessionModel.findOne({device_id: deviceId});
//         if(user) {
//             return user
//         } else {
//             return null
//         }
//     }
//     async findUserByDeviceId(deviceId: string) {
//         const session = await this.sessionModel.findOne({ device_id: deviceId });
//         return session || null
//     }

//     async createSession(session: Session) {
//         const saveResult = await this.sessionModel.create(session);
//         return saveResult._id.toString();
//     }
//     async findSessionFromDeviceId(deviceId: string) {
//         return this.sessionModel.findOne({ device_id: deviceId });
//     }
//     async updateIat(iat: string, deviceId: string) {
//         await this.sessionModel.updateOne({ device_id: deviceId }, { $set: { iat: iat } });
//     }
//     async deleteSession(deviceId: string) {
//         const result = await this.sessionModel.deleteOne({ device_id: deviceId });
//         if (result.deletedCount === 1) {
//             return true;
//         } else {
//             return false;
//         }
//     }
// }