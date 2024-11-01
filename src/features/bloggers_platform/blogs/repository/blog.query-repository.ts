// import { Injectable } from "@nestjs/common";
// // import { CommentRepository } from "src/features/bloggers_platform/comments/repository/comment.repository";
// import { BlogViewModel, PaginatorBlogViewModel } from "../api/models/output.model";
// import { PaginatorPostViewModel, PostViewModel } from "src/features/bloggers_platform/posts/api/models/output.model";
// import { TypeBlogHalper, TypePostForBlogHalper } from "src/base/types/blog.types";
// import { InjectModel } from "@nestjs/mongoose";
// import { Blog, BlogDocument, BlogModelType } from "../domain/blog.entity";
// import { Post, PostDocument, PostModelType } from "src/features/bloggers_platform/posts/domain/post.entity";
// import { blogPagination } from "src/base/models/blog.model";
// import { likeStatus, LikesType, NewestLikesType } from "src/features/bloggers_platform/likes/api/models/input.model";


// @Injectable()
// export class BlogQueryRepository {
//     constructor(
//     // protected commentRepository: CommentRepository,
//     @InjectModel(Blog.name) private blogModel: BlogModelType,
//     @InjectModel(Post.name) private postModel: PostModelType
//     ) {}

//     async getAllBlogs(helper: TypeBlogHalper): Promise <PaginatorBlogViewModel> {
//         const queryParams = blogPagination(helper);
//         const search = helper.searchNameTerm
//             ? { name: { $regex: helper.searchNameTerm, $options: "i" } }
//             : {};
//         const items: BlogDocument[] = await this.blogModel
//             .find(search)
//             .sort({ [queryParams.sortBy]: queryParams.sortDirection })
//             .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
//             .limit(queryParams.pageSize)
//             .exec();
//         const totalCount = await this.blogModel.countDocuments(search);
//         const blogs = {
//             pagesCount: Math.ceil(totalCount / queryParams.pageSize),
//             page: queryParams.pageNumber,
//             pageSize: queryParams.pageSize,
//             totalCount,
//             items: items.map(this.blogMap),
//         };
//         return blogs;
//     }
//     async getBlogById(blogId: string) {
//         const blog = await this.blogModel.findOne({ _id: blogId });
//         if (!blog) {
//             return null;
//         }
//         return this.blogMap(blog);
//     }
//     async getPostForBlogById(postId: string) {
//         const post = await this.postModel.findOne({ _id: postId });
//         if (!post) {
//             return null;
//         }
//         return this.mapPost(post);
//     }
//     async getPostFofBlog(helper: TypePostForBlogHalper, id: string, userId: string | null): Promise<PaginatorPostViewModel> {
//         const queryParams = blogPagination(helper);
//         const posts: PostDocument[] = await this.postModel
//             .find({ blogId: id })
//             .sort({ [queryParams.sortBy]: queryParams.sortDirection })
//             .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
//             .limit(queryParams.pageSize)
//             .exec();
//         const totalCount = await this.postModel.countDocuments({ blogId: id });

//         const items = await Promise.all(posts.map(async post => {
//             let like;
//             if (userId) {
//                 // like = await this.commentRepository.findLike(post._id.toString(), userId);
//             }
//             // const allLikes = await this.commentRepository.findAllLikesForPost(post._id.toString());
//             // const userLikeStatus = like ? like.status : likeStatus.None;
//             return this.mapPost(post/*, userLikeStatus, allLikes*/);
//         }));

//         return {
//             pagesCount: Math.ceil(totalCount / queryParams.pageSize),
//             page: queryParams.pageNumber,
//             pageSize: queryParams.pageSize,
//             totalCount,
//             items,
//         };
//     }
//     mapPost(post: PostDocument/*, userLikeStatus?: likeStatus, allLikes?: LikesType[]*/): PostViewModel {
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
//             id: post.id,
//             title: post.title,
//             shortDescription: post.shortDescription,
//             content: post.content,
//             blogId: post.blogId,
//             blogName: post.blogName,
//             createdAt: post.createdAt,
//             extendedLikesInfo: {
//                 likesCount: post.extendedLikesInfo.likesCount,
//                 dislikesCount: post.extendedLikesInfo.dislikesCount,
//                 myStatus: /*userLikeStatus || */likeStatus.None,
//                 newestLikes: newestLikes
//             },
//         };
//     }
//     blogMap(blog: BlogDocument): BlogViewModel {
//         return {
//             id: blog.id,
//             name: blog.name,
//             description: blog.description,
//             websiteUrl: blog.websiteUrl,
//             createdAt: blog.createdAt,
//             isMembership: blog.isMembership,
//         };
//     }
// }