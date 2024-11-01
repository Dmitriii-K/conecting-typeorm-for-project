// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { CommentRepository } from "src/features/bloggers_platform/comments/repository/comment.repository";
// import { Post, PostDocument, PostModelType } from "../domain/post.entity";
// import { Comment, CommentDocument, CommentModelType } from "src/features/bloggers_platform/comments/domain/comment.entity";
// import { CommentViewModel, PaginatorCommentViewModelDB } from "src/features/bloggers_platform/comments/api/models/output.model";
// import { PaginatorPostViewModel, PostViewModel } from "../api/models/output.model";
// import { TypePostHalper } from "src/base/types/post.types";
// import { postPagination } from "src/base/models/post.model";
// import { commentsPagination } from "src/base/models/comment.model";
// import { likeStatus, LikesType, NewestLikesType } from "src/features/bloggers_platform/likes/api/models/input.model";
// import { MeViewModel } from "src/features/auth/api/models/output.model";


// @Injectable()
// export class PostQueryRepository {
//     constructor(
//         protected commentRepository: CommentRepository,
//         @InjectModel(Post.name) private postModel: PostModelType,
//         @InjectModel(Comment.name) private commentModel: CommentModelType
//     ) {}

//     async getAllPosts(helper: TypePostHalper, user: MeViewModel | null): Promise<PaginatorPostViewModel> {
//         const queryParams = postPagination(helper);
//         const posts: PostDocument[] = (await this.postModel
//             .find({})
//             .sort({ [queryParams.sortBy]: queryParams.sortDirection })
//             .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
//             .limit(queryParams.pageSize)
//             .exec());
//         const totalCount = await this.postModel.countDocuments({});

//         const items = await Promise.all(posts.map(async post => {
//             let like;
//             if (user) {
//                 // like = await this.commentRepository.findLike(post._id.toString(), user.userId);
//             }
//             // const allLikes = await this.commentRepository.findAllLikesForPost(post._id.toString());
//             const userLikeStatus = like ? like.status : likeStatus.None;
//             return this.mapPost(post, userLikeStatus/*, allLikes*/);
//         }));

//         return {
//             pagesCount: Math.ceil(totalCount / queryParams.pageSize),
//             page: queryParams.pageNumber,
//             pageSize: queryParams.pageSize,
//             totalCount,
//             items,
//         };
//     }
//     async findPostById(postId: string, userId: string | null) {
//         // console.log(`userId`,userId);////////////////
//         const post = await this.postModel.findOne({ _id: postId });
//         // console.log(`post`,post);////////////////
//         if (!post) {
//             return null;
//         }
//         let like;
//         if (userId) {
//             // like = await this.commentRepository.findLike(postId, userId);
//         }
//         // const allLikes = await this.commentRepository.findAllLikesForPost(post._id.toString());
//         const userLikeStatus = like ? like.status : likeStatus.None;
//         // console.log(`userLikeStatus`,userLikeStatus);////////////////
//         // console.log(`like`,like);////////////////
//         return this.mapPost(post, userLikeStatus/*, allLikes*/);
//     }
//     async findCommentById(commentId: string) {
//         const comment = await this.commentModel.findOne({ _id: commentId });
//         if (!comment) {
//             return null;
//         }
//         return this.mapComment(comment);
//     }
//     async findCommentByPost(helper: TypePostHalper, id: string, userId: string | null): Promise<PaginatorCommentViewModelDB> {
//         const queryParams = commentsPagination(helper);
//         const comments: CommentDocument[] = await this.commentModel
//             .find({ postId: id })
//             .sort({ [queryParams.sortBy]: queryParams.sortDirection })
//             .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
//             .limit(queryParams.pageSize)
//             .exec();

//         const totalCount = await this.commentModel.countDocuments({ postId: id });

//         const items = await Promise.all(comments.map(async comment => {
//             let like;
//             if (userId) {
//                 like = await this.commentRepository.findLike(comment._id.toString(), userId);
//             }
//             const userLikeStatus = like ? like.status : likeStatus.None;
//             return this.mapComment(comment, userLikeStatus);
//         }));

//         return {
//             pagesCount: Math.ceil(totalCount / queryParams.pageSize),
//             page: queryParams.pageNumber,
//             pageSize: queryParams.pageSize,
//             totalCount,
//             items,
//         };
//     }
//     mapPost(post: PostDocument, userLikeStatus?: likeStatus/*, allLikes?: LikesType[]*/): PostViewModel {
//         const newestLikes: NewestLikesType[] = [];

//         // if (allLikes) {
//         //     // Фильтруем лайки, оставляя только те, у которых статус равен "Like"
//         //     const likesOnly = allLikes.filter(like => like.status === 'Like');
//         //     // Сортируем лайки по полю addedAt в порядке убывания
//         //     likesOnly.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
//         //     // Ограничиваем количество лайков, если нужно
//         //     const limitedLikes = likesOnly.slice(0, 3);

//         //     newestLikes.push(...limitedLikes.map(like => ({
//         //         addedAt: like.addedAt,
//         //         userId: like.userId,
//         //         login: like.userLogin
//         //     })));
//         // }
//         return {
//             id: post._id.toString(),
//             title: post.title,
//             shortDescription: post.shortDescription,
//             content: post.content,
//             blogId: post.blogId,
//             blogName: post.blogName,
//             createdAt: post.createdAt,
//             extendedLikesInfo: {
//                 likesCount: post.extendedLikesInfo.likesCount,
//                 dislikesCount: post.extendedLikesInfo.dislikesCount,
//                 myStatus: userLikeStatus || likeStatus.None,
//                 newestLikes: newestLikes
//             },
//         };
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