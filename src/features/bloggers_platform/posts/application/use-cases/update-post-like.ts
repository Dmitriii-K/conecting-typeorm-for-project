// import { CommentRepository } from "src/features/bloggers_platform/comments/repository/comment.sql.repository";
// import { PostRepository } from "../../repository/post.sql.repository";
// import { Post } from "../../domain/post.sql.entity";
// import { MeViewModel } from "src/features/auth/api/models/output.model";
// import { likeStatus } from "src/features/bloggers_platform/likes/api/models/input.model";
// import { Like } from "src/features/bloggers_platform/likes/domain/like.sql.entity";
// import {WithId} from "mongodb"
// import { CommandHandler } from "@nestjs/cqrs";

// export class UpdatePostLikeCommand {
//     constructor(
//         public user: MeViewModel,
//         public body: likeStatus,
//         public post: WithId<Post>
//         ) {}
// }

// @CommandHandler(UpdatePostLikeCommand)
// export class UpdatePostLikeUseCase {
//     constructor(
//         private postRepository: PostRepository,
//         private commentRepository: CommentRepository
//     ) {}

//     async execute(command: UpdatePostLikeCommand) {
//         const {user, body, post} = command;

//         const existLike = await this.commentRepository.findLike(post._id.toString(), user.userId);
//         if (!existLike) {
//             const newLike: Like = Like.createLike(post._id.toString(), user.userId, user.login, body);
//             if (body === likeStatus.Like) {
//                 post.extendedLikesInfo.likesCount++;
//             } else if (body === likeStatus.Dislike) {
//                 post.extendedLikesInfo.dislikesCount++;
//             }
//             await this.commentRepository.insertLike(newLike);
//             await this.postRepository.updatePostCount(post._id.toString(), post.extendedLikesInfo.likesCount, post.extendedLikesInfo.dislikesCount);
//             return true;
//         } else {
//             if (existLike.status !== body) {
//                 // Обновление счетчиков лайков и дизлайков
//                 if (existLike.status === likeStatus.Like && body === likeStatus.Dislike) {
//                     post.extendedLikesInfo.likesCount--;
//                     post.extendedLikesInfo.dislikesCount++;
//                 } else if (existLike.status === likeStatus.Dislike && body === likeStatus.Like) {
//                     post.extendedLikesInfo.dislikesCount--;
//                     post.extendedLikesInfo.likesCount++;
//                 } else if (existLike.status === likeStatus.Like && body === likeStatus.None) {
//                     post.extendedLikesInfo.likesCount--;
//                 } else if (existLike.status === likeStatus.Dislike && body === likeStatus.None) {
//                     post.extendedLikesInfo.dislikesCount--;
//                 } else if (existLike.status === likeStatus.None && body === likeStatus.Like) {
//                     post.extendedLikesInfo.likesCount++;
//                 } else if (existLike.status === likeStatus.None && body === likeStatus.Dislike) {
//                     post.extendedLikesInfo.dislikesCount++;
//                 }
//                 existLike.status = body;
//                 await this.commentRepository.updateLikeStatus(post._id.toString(), existLike.status);
//                 await this.postRepository.updatePostCount(post._id.toString(), post.extendedLikesInfo.likesCount, post.extendedLikesInfo.dislikesCount);
//                 return true;
//             }
//         }
//         return false;
//     }
// }