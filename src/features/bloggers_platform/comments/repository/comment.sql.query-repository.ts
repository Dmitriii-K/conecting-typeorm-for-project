import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { CommentViewModel } from "../api/models/output.model";
import { CommentRepository } from "./comment.sql.repository";

@Injectable()
export class CommentQueryRepository {
    constructor(
        private dataSource: DataSource,
        protected commentRepository: CommentRepository
    ) {}

    async findCommentById(commentId: string, userId: string | null): Promise<CommentViewModel | null> {
        const query = `
            SELECT 
            c.id, 
            c.content, 
            c."createdAt", 
            u.id AS "userId", 
            u.login AS "userLogin",
            COUNT(CASE WHEN cl."likeStatus" = 'Like' THEN 1 END) AS "likesCount",
            COUNT(CASE WHEN cl."likeStatus" = 'Dislike' THEN 1 END) AS "dislikesCount",
            COALESCE(cl2."likeStatus", 'None') AS "userLikeStatus"
        FROM "Comments" c
        LEFT JOIN "CommentsLikes" cl 
            ON c.id = cl."commentsId"
        LEFT JOIN "Users" u 
            ON c."userId" = u.id
        LEFT JOIN "CommentsLikes" cl2 
            ON c.id = cl2."commentsId" AND cl2."userId" = $2
        WHERE c.id = $1
        GROUP BY c.id, c.content, c."createdAt", u.id, u.login, cl2."likeStatus";
    `;
        const comment = await this.dataSource.query(query, [commentId, userId]);
        // console.log('comment1', comment);//-------------------

        if (!comment.length) {
            return null;
        }
        // console.log('comment2', comment);//-------------------
    
        return this.mapComment(comment[0]);
    }

    mapComment(comment: any): CommentViewModel {
        // json_build_object() as comentatorInfo
    return {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        commentatorInfo: {
            userId: comment.userId,
            userLogin: comment.userLogin
        },
        likesInfo: {
            likesCount: parseInt(comment.likesCount, 10) || 0,
            dislikesCount: parseInt(comment.dislikesCount, 10) || 0,
            myStatus: comment.userLikeStatus 
            }
        };
    }
}