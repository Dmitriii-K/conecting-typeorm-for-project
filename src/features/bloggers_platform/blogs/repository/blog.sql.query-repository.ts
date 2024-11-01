import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Blog } from '../domain/blog.sql.entity';
import { TypeBlogHalper, TypePostForBlogHalper } from 'src/base/types/blog.types';
import { BlogViewModel, PaginatorBlogViewModel } from '../api/models/output.model';
import { PaginatorPostViewModel, PostViewModel } from '../../posts/api/models/output.model';
import { blogPagination } from 'src/base/models/blog.model';

@Injectable()
export class BlogQueryRepository {
    constructor(private dataSource: DataSource) {}

    async getAllBlogs(helper: TypeBlogHalper): Promise<PaginatorBlogViewModel> {
        const queryParams = blogPagination(helper);
        const search = helper.searchNameTerm
            ? `WHERE "name" ILIKE '%${helper.searchNameTerm}%'`
            : '';

        const query = `
            SELECT * FROM "Blogs"
            ${search}
            ORDER BY "${queryParams.sortBy}" ${queryParams.sortDirection}
            LIMIT ${queryParams.pageSize} OFFSET ${(queryParams.pageNumber - 1) * queryParams.pageSize}
        `;

        const items = await this.dataSource.query(query);
        const totalCount = await this.dataSource.query(`SELECT COUNT(*) FROM "Blogs" ${search}`);

        const blogs = {
            pagesCount: Math.ceil(totalCount[0].count / queryParams.pageSize),
            page: queryParams.pageNumber,
            pageSize: queryParams.pageSize,
            totalCount: parseInt(totalCount[0].count),
            items: items.map(this.blogMap),
        };

        return blogs;
    }

    async getBlogById(blogId: string): Promise<BlogViewModel | null> {
        const query = `SELECT * FROM "Blogs" WHERE id = $1`;
        const blog = await this.dataSource.query(query, [blogId]);

        if (!blog.length) {
            return null;
        }

        return this.blogMap(blog[0]);
    }

    async getPostForBlogById(postId: string): Promise<PostViewModel | null> {
        const query = `
            SELECT p.*, b."name" AS "blogName",
                COUNT(CASE WHEN pl."likeStatus" = 'Like' THEN 1 END) AS "likesCount",
                COUNT(CASE WHEN pl."likeStatus" = 'Dislike' THEN 1 END) AS "dislikesCount",
                COALESCE(pl2."likeStatus", 'None') AS "userLikeStatus"
            FROM "Posts" p
            LEFT JOIN "Blogs" b 
                ON p."blogId" = b.id
            LEFT JOIN "PostsLikes" pl 
                ON p.id = pl."postId"
            LEFT JOIN "PostsLikes" pl2 
                ON p.id = pl2."postId"
            WHERE p.id = $1
            GROUP BY p.id, b."name", pl2."likeStatus"
        `;
    
        const post = await this.dataSource.query(query, [postId]);
    
        if (!post.length) {
            return null;
        }
    
        // Получение newestLikes для каждого поста
        const newestLikesQuery = `
            SELECT 
                pl."createdAt" AS "addedAt",
                pl."userId",
                u.login
            FROM "PostsLikes" pl
            LEFT JOIN "Users" u ON pl."userId" = u.id
            WHERE pl."postId" = $1 AND pl."likeStatus" = 'Like'
            ORDER BY pl."createdAt" DESC
            LIMIT 3
        `;
        const newestLikes = await this.dataSource.query(newestLikesQuery, [postId]);
    
        return this.mapPost(post[0], newestLikes);
    }

    async getPostsForBlog(helper: TypePostForBlogHalper, id: string, userId: string | null): Promise<PaginatorPostViewModel> {
        const queryParams = blogPagination(helper);
    
        const query = `
            SELECT p.*, b."name" AS "blogName",
                COUNT(CASE WHEN pl."likeStatus" = 'Like' THEN 1 END) AS "likesCount",
                COUNT(CASE WHEN pl."likeStatus" = 'Dislike' THEN 1 END) AS "dislikesCount",
                COALESCE(pl2."likeStatus", 'None') AS "userLikeStatus"
            FROM "Posts" p
            LEFT JOIN "Blogs" b 
                ON p."blogId" = b.id
            LEFT JOIN "PostsLikes" pl 
                ON p.id = pl."postId"
            LEFT JOIN "PostsLikes" pl2 
                ON p.id = pl2."postId" AND pl2."userId" = $2
            WHERE p."blogId" = $1
            GROUP BY p.id, b."name", pl2."likeStatus"
            ORDER BY "${queryParams.sortBy}" ${queryParams.sortDirection}
            LIMIT $3 OFFSET $4
        `;
    
        const posts = await this.dataSource.query(query, [id, userId, queryParams.pageSize, (queryParams.pageNumber - 1) * queryParams.pageSize]);
        const totalCount = await this.dataSource.query(`SELECT COUNT(*) FROM "Posts" WHERE "blogId" = $1`, [id]);
    
        const items = await Promise.all(posts.map(async post => {
            // Получение newestLikes для каждого поста
            const newestLikesQuery = `
                SELECT 
                    pl."createdAt" AS "addedAt",
                    pl."userId",
                    u.login
                FROM "PostsLikes" pl
                LEFT JOIN "Users" u ON pl."userId" = u.id
                WHERE pl."postId" = $1 AND pl."likeStatus" = 'Like'
                ORDER BY pl."createdAt" DESC
                LIMIT 3
            `;
            const newestLikes = await this.dataSource.query(newestLikesQuery, [post.id]);
    
            return this.mapPost(post, newestLikes);
        }));
    
        return {
            pagesCount: Math.ceil(totalCount[0].count / queryParams.pageSize),
            page: queryParams.pageNumber,
            pageSize: queryParams.pageSize,
            totalCount: parseInt(totalCount[0].count),
            items,
        };
    }

    mapPost(post: any, newestLikes): PostViewModel {
        return {
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt,
            extendedLikesInfo: {
                likesCount: parseInt(post.likesCount, 10) || 0,
                dislikesCount: parseInt(post.dislikesCount, 10) || 0,
                myStatus: post.userLikeStatus,
                newestLikes: newestLikes.map(like => ({
                    addedAt: like.addedAt,
                    userId: like.userId,
                    login: like.login
                }))
            },
        };
    }

    blogMap(blog: Blog): BlogViewModel {
        return {
            id: blog.id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership,
        };
    }
}