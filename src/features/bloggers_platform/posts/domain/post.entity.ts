// import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument, Model } from 'mongoose';

// @Schema({ _id: false })
// class NewestLikes {
//     @Prop({ required: true })
//     addedAt: string;

//     @Prop({ required: true })
//     userId: string;

//     @Prop({ required: true })
//     login: string;
// }

// @Schema({ _id: false })
// class ExtendedLikesInfo {
//     @Prop({ required: true })
//     likesCount: number;

//     @Prop({ required: true })
//     dislikesCount: number;

//     @Prop({ type: [NewestLikes], required: true })
//     newestLikes: NewestLikes[];
// }

// @Schema()
// export class Post {
//     @Prop({ required: true })
//     title: string;

//     @Prop({ required: true })
//     shortDescription: string;

//     @Prop({ required: true })
//     content: string;

//     @Prop({ required: true })
//     blogId: string;

//     @Prop({ required: true })
//     blogName: string;

//     @Prop({ required: true })
//     createdAt: string;

//     @Prop({ type: ExtendedLikesInfo, required: true })
//     extendedLikesInfo: ExtendedLikesInfo;

//     static createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string): Post {
//         const post = new this();
        
//         post.title = title;
//         post.shortDescription = shortDescription;
//         post.content = content;
//         post.blogId = blogId;
//         post.blogName = blogName;
//         post.createdAt = new Date().toISOString();
//         post.extendedLikesInfo = {
//             likesCount: 0,
//             dislikesCount: 0,
//             newestLikes: []
//         };
//         return post;
//     }
// }

// export const PostSchema = SchemaFactory.createForClass(Post);
// PostSchema.loadClass(Post);

// export type PostDocument = HydratedDocument<Post>;

// export type PostModelType = Model<PostDocument>