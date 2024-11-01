// import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
// import { IsNumber, IsString } from 'class-validator';
// import {HydratedDocument, Model} from 'mongoose'
// import { Trim } from 'src/infrastructure/decorators/transform/trim';


// @Schema({ _id: false })
// class CommentatorInfo {
// @Prop({ type: String, required: true })
// userId: string;

// @Prop({ type: String, required: true })
// userLogin: string;
// }

// @Schema({ _id: false })
// class LikesCount {
// @Prop({ type: Number, required: true, default: 0 })
// likesCount: number;

// @Prop({ type: Number, required: true, default: 0 })
// dislikesCount: number;
// }

// @Schema()
// export class Comment {
// @Prop({ type: String, required: true })
// postId: string;

// @Prop({ type: String, required: true })
// content: string;

// @Prop({ type: String, required: true })
// createdAt: string;

// @Prop({ type: CommentatorInfo, required: true })
// commentatorInfo: CommentatorInfo;

// @Prop({ type: LikesCount, required: true })
// likesInfo: LikesCount;

//     static createComment(id: string, content: string, userId: string, login: string): Comment {
//         const comment = new this();

//         comment.postId = id;
//         comment.content = content;
//         comment.createdAt = new Date().toISOString();
//         comment.commentatorInfo = {
//             userId: userId,
//             userLogin: login,
//         };
//         comment.likesInfo = {
//             likesCount: 0,
//             dislikesCount: 0
        
//     }
//     return comment;
//     }
// }

// export const CommentSchema = SchemaFactory.createForClass(Comment);
// CommentSchema.loadClass(Comment);

// export type CommentDocument = HydratedDocument<Comment>;

// export type CommentModelType = Model<CommentDocument>