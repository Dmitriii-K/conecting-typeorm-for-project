// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { Post, PostModelType } from "../domain/post.entity";
// import { PostInputModel } from "../api/models/input.model";
// import {WithId} from "mongodb"

// @Injectable()
// export class PostRepository {
//     constructor(@InjectModel(Post.name) private postModel: PostModelType) {}

//     async findPostById(postId: string): Promise<WithId<Post> | null>{
//         return this.postModel.findOne({ _id: postId });
//     }
//     async insertPost(data: Post) {
//         const result = this.postModel.create(data);
//         return (await result)._id.toString();
//     }
//     async updatePost(post: PostInputModel, postId: string) {
//         const result = this.postModel.updateOne({ _id: postId }, { $set: post });
//         return (await result).modifiedCount === 1;
//     }
//     async updatePostCount(postId: string, likesCount: number, dislikesCount: number) {
//         const result = this.postModel.updateOne(
//             { _id: postId },
//             { $set: { 'extendedLikesInfo.likesCount': likesCount, 'extendedLikesInfo.dislikesCount': dislikesCount } });
//         return (await result).modifiedCount === 1;
//     }
//     async deletePost(postId: string) {
//         const result = await this.postModel.deleteOne({ _id: postId });
//         return result.deletedCount === 1;
//     }
//     async insertPostForBlog(data: Post) {
//         const result = this.postModel.create(data);
//         return (await result)._id.toString();
//     }
// }