import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Schema()
export class Session {
    @Prop({ required: true })
    user_id: string;

    @Prop({ required: true })
    device_id: string;

    @Prop({ required: true })
    iat: string;

    @Prop({ required: true })
    exp: string;

    @Prop({ required: true })
    device_name: string;

    @Prop({ required: true })
    ip: string;

    static createSession(userId: string, deviceId: string, iat: string, exp: string, userAgent: string, ip: string): Session {
        const session = new this();
        
        session.user_id = userId;
        session.device_id = deviceId;
        session.iat = iat;
        session.exp = exp;
        session.device_name = userAgent;
        session.ip = ip
        return session;
    }
}

export const SessionSchema = SchemaFactory.createForClass(Session);
SessionSchema.loadClass(Session);

export type SessionDocument = HydratedDocument<Session>;

export type SessionModelType = Model<SessionDocument>