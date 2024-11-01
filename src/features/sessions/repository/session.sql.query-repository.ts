import { Injectable } from "@nestjs/common";
import { DeviceViewModel } from "../api/models/output.model";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Session } from "../domain/session.sql.entity";

@Injectable()
export class SessionsQueryRepository{
    constructor(@InjectDataSource() protected dataSource: DataSource) {}

    async findSessions(userId: string): Promise<DeviceViewModel[] | null> {
        if (!userId) {
            throw new Error("User ID is required");
        }
        const currentTime = new Date().toISOString();

        const query = `
            SELECT * FROM "Sessions"
            WHERE user_id = $1 
            --AND exp >= $2
        `;
        const sessions = await this.dataSource.query(query, [userId/*, currentTime*/]);
        return sessions.map(this.mapSession);
    }

    mapSession(session: Session): DeviceViewModel {
        return {
            ip: session.ip,
            title: session.device_name,
            lastActiveDate: session.iat,
            deviceId: session.device_id
        };
    }
}