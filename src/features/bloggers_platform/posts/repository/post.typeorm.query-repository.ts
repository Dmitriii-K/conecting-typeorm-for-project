// import { Injectable } from "@nestjs/common";
// import { TypePostHalper } from "src/base/types/post.types";
// import { DataSource } from "typeorm";
// import { PaginatorPostViewModel, PostViewModel } from "../api/models/output.model";
// import { postPagination } from "src/base/models/post.model";
// import { CommentViewModel, PaginatorCommentViewModelDB } from "../../comments/api/models/output.model";
// import { commentsPagination } from "src/base/models/comment.model";
// import { likeStatus } from "../../likes/api/models/input.model";

// @Injectable()
// export class PostQueryRepository {
//     constructor(private dataSource: DataSource) {}

//     async getAllPosts(helper: TypePostHalper, userId: string | null): Promise<PaginatorPostViewModel> {
//         const queryParams = postPagination(helper);
    
//         const query = `
//             SELECT p.*, b."name" AS "blogName"
//             FROM "Posts" AS p
//             LEFT JOIN "Blogs" AS b 
//                 ON p."blogId" = b.id
//             ORDER BY "${queryParams.sortBy}" ${queryParams.sortDirection}
//             LIMIT $1 OFFSET $2
//         `;
    
//         const posts = await this.dataSource.query(query, [/*userId, */queryParams.pageSize, (queryParams.pageNumber - 1) * queryParams.pageSize]);
//         const totalCount = await this.dataSource.query(`SELECT COUNT(*) FROM "Posts"`);
    
//         const items = await Promise.all(posts.map(async post => {
//             // const newestLikesQuery = `
//             //     SELECT 
//             //         pl."createdAt" AS "addedAt",
//             //         pl."userId",
//             //         u.login
//             //     FROM "PostsLikes" pl
//             //     LEFT JOIN "Users" u ON pl."userId" = u.id
//             //     WHERE pl."postId" = $1 AND pl."likeStatus" = 'Like'
//             //     ORDER BY pl."createdAt" DESC
//             //     LIMIT 3
//             // `;
//             // const newestLikes = await this.dataSource.query(newestLikesQuery, [post.id]);
//             return this.mapPost(post);
//         }));
    
//         return {
//             pagesCount: Math.ceil(totalCount[0].count / queryParams.pageSize),
//             page: queryParams.pageNumber,
//             pageSize: queryParams.pageSize,
//             totalCount: parseInt(totalCount[0].count),
//             items,
//         };
//     }

//     async findPostById(postId: string, userId: string | null): Promise<PostViewModel | null> {
//         const query = `
//             SELECT 
//                 p.*, 
//                 b."name" AS "blogName"
//             FROM "Posts" p
//             LEFT JOIN "Blogs" b 
//                 ON p."blogId" = b.id
//             WHERE p.id = $1
//         `;
//         const post = await this.dataSource.query(query, [postId/*, userId*/]);

//         if (!post.length) {
//             return null;
//         }

//     //     const newestLikesQuery = `
//     //     SELECT 
//     //         pl."createdAt" AS "addedAt",
//     //         pl."userId",
//     //         u.login
//     //     FROM "PostsLikes" pl
//     //     LEFT JOIN "Users" u ON pl."userId" = u.id
//     //     WHERE pl."postId" = $1 AND pl."likeStatus" = 'Like'
//     //     ORDER BY pl."createdAt" DESC
//     //     LIMIT 3
//     // `;
//     // const newestLikes = await this.dataSource.query(newestLikesQuery, [postId]);
//         return this.mapPost(post[0]/*, newestLikes*/);
//     }

//     async findCommentByPost(helper: TypePostHalper, postId: string, userId: string | null): Promise<PaginatorCommentViewModelDB> {
//         const queryParams = commentsPagination(helper);
    
//         const query = `
//             SELECT c.*, u.id AS "userId", u.login AS "userLogin",
//                 COUNT(CASE WHEN cl."likeStatus" = 'Like' THEN 1 END) AS "likesCount",
//                 COUNT(CASE WHEN cl."likeStatus" = 'Dislike' THEN 1 END) AS "dislikesCount",
//                 COALESCE(cl2."likeStatus", 'None') AS "userLikeStatus"
//             FROM "Comments" c
//             LEFT JOIN "Posts" p
//                 ON c."postId" = p.id
//             LEFT JOIN "CommentsLikes" cl 
//                 ON c.id = cl."commentsId"
//             LEFT JOIN "Users" u 
//                 ON c."userId" = u.id
//             LEFT JOIN "CommentsLikes" cl2 
//                 ON c.id = cl2."commentsId" AND cl2."userId" = $2
//             WHERE c."postId" = $1
//             GROUP BY c.id, u.id, u.login, cl2."likeStatus"
//             ORDER BY "${queryParams.sortBy}" ${queryParams.sortDirection}
//             LIMIT $3 OFFSET $4
//         `;
    
//         const comments = await this.dataSource.query(query, [postId, userId, queryParams.pageSize, (queryParams.pageNumber - 1) * queryParams.pageSize]);
//         // console.log('comments', comments);//-------------------
//         const totalCount = await this.dataSource.query(`SELECT COUNT(*) FROM "Comments" WHERE "postId" = $1`, [postId]);
    
//         const items = await Promise.all(comments.map(async comment => {
//             return this.mapComment(comment);
//         }));
    
//         return {
//             pagesCount: Math.ceil(totalCount[0].count / queryParams.pageSize),
//             page: queryParams.pageNumber,
//             pageSize: queryParams.pageSize,
//             totalCount: parseInt(totalCount[0].count),
//             items,
//         };
//     }

//     mapPost(post: any): PostViewModel {
//         return {
//             id: post.id,
//             title: post.title,
//             shortDescription: post.shortDescription,
//             content: post.content,
//             blogId: post.blogId,
//             blogName: post.blogName,
//             createdAt: post.createdAt,
//             extendedLikesInfo: {
//                 likesCount:  0,
//                 dislikesCount:  0,
//                 myStatus: likeStatus.None,
//                 newestLikes: []
//             },
//         };
//     }

//     mapComment(comment: any): CommentViewModel {
//         // json_build_object() as comentatorInfo
//     return {
//         id: comment.id,
//         content: comment.content,
//         createdAt: comment.createdAt,
//         commentatorInfo: {
//             userId: comment.userId,
//             userLogin: comment.userLogin
//         },
//         likesInfo: {
//             likesCount: parseInt(comment.likesCount, 10) || 0,
//             dislikesCount: parseInt(comment.dislikesCount, 10) || 0,
//             myStatus: comment.userLikeStatus 
//             }
//         };
//     }
// }