// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { Session, SessionModelType } from "../domain/session.entity";
// import { DeviceViewModel } from "../api/models/output.model";
// import { SessionsType } from "src/base/types/session.types";

// @Injectable()
// export class SessionsQueryRepository /*implements ICommentQueryRepository*/{
//     constructor(@InjectModel(Session.name) private sessionModel: SessionModelType) {}

//     async findSessions(userId: string): Promise<DeviceViewModel[] | null> {
//         if (!userId) {
//             throw new Error("User ID is required");
//         }
//         const currentTime = new Date().toISOString();
//         const sessions = await this.sessionModel.find({ user_id: userId}).exec(); // , exp: { $gte: currentTime } 
//         return sessions.map(this.mapSession);
//     }
//     mapSession(session: SessionsType): DeviceViewModel {
//         return {
//             ip: session.ip,
//             title: session.device_name,
//             lastActiveDate: session.iat,
//             deviceId: session.device_id
//         };
//     }
// }