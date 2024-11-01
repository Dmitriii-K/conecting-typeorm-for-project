// import { Injectable } from "@nestjs/common";
// import { ICommentQueryRepository, ICommentRepository } from "../api/models/interface";
// import { InjectModel } from "@nestjs/mongoose";
// import { CommentViewModel } from "../api/models/output.model";
// import { Comment, CommentDocument, CommentModelType } from "../domain/comment.entity";
// import { CommentRepository } from "./comment.repository";
// import { likeStatus } from "src/features/bloggers_platform/likes/api/models/input.model";

// @Injectable()
// export class CommentQueryRepository /*implements ICommentQueryRepository*/{
//     constructor(
//         protected commentRepository: CommentRepository,
//         @InjectModel(Comment.name) private commentModel: CommentModelType
//     ) {}

//     async findCommentById(commentId: string, userId: string | null) {
//         const comment = await this.commentModel.findOne({ _id: commentId });
//         if (!comment) {
//             return null;
//         }
//         let like;
//         if (userId) {
//             like = await this.commentRepository.findLike(commentId, userId);
//         }
//         const userLikeStatus = like ? like.status : likeStatus.None;
//         return this.mapComment(comment, userLikeStatus);
//     }
//     mapComment(comment: CommentDocument, userLikeStatus?: likeStatus): CommentViewModel {
//         return {
//             id: comment.id,
//             content: comment.content,
//             createdAt: comment.createdAt,
//             commentatorInfo: comment.commentatorInfo,
//             likesInfo: {
//                 likesCount: comment.likesInfo.likesCount,
//                 dislikesCount: comment.likesInfo.dislikesCount,
//                 myStatus: userLikeStatus || likeStatus.None
//             }
//         };
//     }
// }