import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import {HydratedDocument, Model} from 'mongoose';
import { add } from "date-fns";

// const emailConfirmationSchema = new mongoose.Schema<EmailConfirmationType>({
//     confirmationCode: {type: String, require: false},
//     expirationDate: {type: String, require: false},
//     isConfirmed: {type: Boolean, require: true}
// }, { _id: false });
// const UserSchema = new mongoose.Schema<UserDBModel>({
//     login: { type: String, require: true },
//     password: { type: String, require: true },
//     email: { type: String, require: true },
//     createdAt: { type: String, require: true },
//     emailConfirmation: { type: emailConfirmationSchema, require: true }
// })
// export const UserModel = mongoose.model<UserDBModel>('users', UserSchema)

@Schema({ _id: false })
class EmailConfirmationType {
    @Prop({ type: String, required: false, default: '' })
    confirmationCode: string;

    @Prop({ type: String, required: false, default: '' })
    expirationDate: string;

    @Prop({ type: Boolean, required: true, default: false })
    isConfirmed: boolean;
}

@Schema()
export class User {
    @Prop({ type: String, required: true})
    login: string;

    @Prop({ type: String, required: true})
    password: string;

    @Prop({ type: String, required: true})
    email: string;

    @Prop({ type: Date, default: new Date()})
    createdAt: Date;

    @Prop({type: EmailConfirmationType, required: true})
    emailConfirmation: EmailConfirmationType;

    static createUser(login: string, password: string, email: string): User {
        const user = new this();
        
        user.login = login;
        user.password = password;
        user.email = email;
        user.createdAt = new Date();
        user.emailConfirmation = {
            confirmationCode: '',
            expirationDate: '',
            isConfirmed: false
        };
        return user;
    }

    static createUserForRegistration(login: string, password: string, email: string): User {
        const user = new this();
        
        user.login = login;
        user.password = password;
        user.email = email;
        user.createdAt = new Date();
        user.emailConfirmation = {
            confirmationCode: randomUUID(),
            expirationDate: (add(new Date(), { hours: 1, minutes: 30, })).toISOString(),
            isConfirmed: false
        }
        return user;
    }
    // getLogin() {
    //     return this.login;
    // }
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.loadClass(User);

// Types
export type UserDocument = HydratedDocument<User>;

type UserModelStaticType = {
    createUser: (name: string, email: string | null) => UserDocument
}

export type UserModelType = Model<UserDocument> //& UserModelStaticType;