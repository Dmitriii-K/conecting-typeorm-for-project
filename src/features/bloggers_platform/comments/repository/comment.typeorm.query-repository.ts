import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../comments/domain/comment.typeorm.entity';
import { CommentViewModel, mapComment } from '../api/models/output.model';

@Injectable()
export class CommentQueryRepository {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>
    ) {}

    async findCommentById(commentId: string, userId: string | null): Promise<CommentViewModel | null> {
        const queryBuilder = this.commentRepository
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoin('comment.likes', 'likes')
            .leftJoin('comment.likes', 'userLike', 'userLike.userId = :userId', { userId })
            .select([
                'comment.id',
                'comment.content',
                'comment.createdAt',
                'user.id',
                'user.login',
                'COUNT(CASE WHEN likes.likeStatus = \'Like\' THEN 1 END) AS likesCount',
                'COUNT(CASE WHEN likes.likeStatus = \'Dislike\' THEN 1 END) AS dislikesCount',
                'COALESCE(userLike.likeStatus, \'None\') AS userLikeStatus',
            ])
            .where('comment.id = :commentId', { commentId })
            .groupBy('comment.id, comment.content, comment.createdAt, user.id, user.login, userLike.likeStatus');

        const comment = await queryBuilder.getRawOne();

        if (!comment) {
            return null;
        }

        return mapComment(comment);
    }
}