import { likeStatus } from "src/features/bloggers_platform/likes/api/models/input.model";
import { CommentsLike } from "src/features/bloggers_platform/likes/domain/CommentLike.sql.entity";
import { CommentRepository } from "../../repository/comment.sql.repository";
import { CommentViewModel } from "../../api/models/output.model";
import { CommandHandler } from "@nestjs/cqrs";

export class LikeStatusCommand {
    constructor(
        public userId: string,
        public body: likeStatus,
        public comment: CommentViewModel,
    ) {}
}

@CommandHandler(LikeStatusCommand)
export class LikeStatusUseCase {
    constructor(private commentRepository: CommentRepository) {}

    async execute(command: LikeStatusCommand) {
        const {userId, body, comment} = command;

        const existCommentLike = await this.commentRepository.findCommentLike(comment.id, userId);
        if (!existCommentLike) {
            const newCommentLike: CommentsLike = CommentsLike.createCommentLike(userId, comment.id, body);
            await this.commentRepository.insertCommentLike(newCommentLike);
        } else {
            if (existCommentLike.likeStatus !== body) {
                await this.commentRepository.updateCommentLikeStatus(comment.id, userId, body);
            }
        }
        return true;
    }
}