// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { ICommentRepository } from "../api/models/interface";
// import { Comment, CommentModelType } from "../domain/comment.entity";
// import { LikeModelType, Like } from "src/features/bloggers_platform/likes/domain/likes.entity";

// @Injectable()
// export class CommentRepository /*implements ICommentRepository*/{
//     constructor(
//         @InjectModel(Comment.name) private commentModel: CommentModelType,
//         @InjectModel(Like.name) private likesModel: LikeModelType
//     ) {}

//     async updateComment(commentId: string, content: string) {
//         const updateComment = await this.commentModel.updateOne({ _id: commentId }, { $set: { content } });
//         return updateComment.modifiedCount === 1;
//     }
//     async findAllLikesForPost(postId: string): Promise<Like[]> {
//         return this.likesModel.find({ commentId: postId }).exec();
//     }
//     async findLike(commentId: string, userId: string) {
//         const like = await this.likesModel.findOne({ commentId: commentId, userId: userId });
//         return like || null;
//     }
//     async insertLike(data: Like) {
//         const result = this.likesModel.create(data);
//         return (await result)._id.toString();
//     }
//     async updateLikeStatus(id: string, updateStatus: string) {
//         const result = await this.likesModel.updateOne({ commentId: id }, { $set: { status: updateStatus } });
//         return result.modifiedCount === 1;
//     }
//     async updateLikesInfo(commentId: string, likesCount: number, dislikesCount: number) {
//         await this.commentModel.updateOne(
//             { _id: commentId },
//             { $set: { 'likesInfo.likesCount': likesCount, 'likesInfo.dislikesCount': dislikesCount } }
//         );
//     }
//     async findUserByComment(commentId: string) {
//         return this.commentModel.findOne({ _id: commentId });
//     }
//     async deleteComment(commentId: string) {
//         const comment = await this.commentModel.deleteOne({ _id: commentId });
//         return comment.deletedCount === 1;
//     }
//     async insertComment(data: Comment) {
//         const result = this.commentModel.create(data);
//         return (await result).id;
//     }
// }