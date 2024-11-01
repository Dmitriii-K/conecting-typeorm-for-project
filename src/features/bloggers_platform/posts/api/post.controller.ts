import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { PostService } from "../application/post.service";
import { PostQueryRepository } from "../repository/post.sql.query-repository";
import { TypePostHalper } from "src/base/types/post.types";
import { PostInputModel } from "./models/input.model";
import { LikeStatusDto } from "src/features/bloggers_platform/likes/api/models/input.model";
import { Request, Response } from "express";
import { CommentInputModel } from "src/features/bloggers_platform/comments/api/models/input.model";
import { BasicAuthGuard } from "src/infrastructure/guards/basic.guard";
import { JwtAuthGuard } from "src/infrastructure/guards/jwt-auth.guard";
import { SoftAuthGuard } from "src/infrastructure/guards/dubl-guards/soft-auth.guard";
import { UpdatePostLikeCommand } from "../application/use-cases/sql-update-post-like";
import { CommandBus } from "@nestjs/cqrs";
import { CreatePostCommand } from "../application/use-cases/create-post";
import { CreateCommentByPostCommand } from "../application/use-cases/create-comment-by-post";
import { CommentQueryRepository } from "../../comments/repository/comment.sql.query-repository";


@Controller('posts')
export class PostController {
    constructor(
        private postService: PostService,
        private postQueryRepository: PostQueryRepository,
        private commentQueryRepository: CommentQueryRepository,
        private commandBus: CommandBus,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Put(':id/like-status')
    @HttpCode(204)//----------------
    async updateLikeStatus(
        @Param('id') id: string,
        @Body() body: LikeStatusDto,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request
    ) {
        const user = req.user ? req.user : null;
        if(!user) throw new UnauthorizedException()
        // console.log('userId', user.userId);//-------------------
        const post = await this.postService.findPostById(id);
        if (!post || !user) {
            throw new NotFoundException();
            }
        const result = await this.commandBus.execute(new UpdatePostLikeCommand(user.userId, body.likeStatus, post));
        return result;
    }

    @UseGuards(SoftAuthGuard)
    @Get(':id/comments')//-----------------
    async getCommentByPost(
        @Query() query: TypePostHalper,
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
        const userId: string | null = req.user ? req.user.userId : null;
        // if(!userId) throw new UnauthorizedException()
        const comments = await this.postQueryRepository.findCommentByPost(query, id, userId);
        if (comments.items.length < 1) {
            throw new NotFoundException();
            }
            return comments;
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/comments')//---------------
    async createCommentByPostId(
        @Body() body: CommentInputModel,
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request
    ) {
        const user = req.user ? req.user : null;
        if(!user) throw new UnauthorizedException()
        // const createResult = await this.postService.createCommentByPost(id, body, user!);
        const commentId = await this.commandBus.execute(new CreateCommentByPostCommand(id, body, user));
        // console.log('commentId', commentId);//-------------------
        if (!commentId) {
            throw new NotFoundException();
        }
        const newComment = await this.commentQueryRepository.findCommentById(commentId, user.userId);
        // console.log('newComment', newComment);//-------------------
        return newComment;
    }

    @UseGuards(SoftAuthGuard)
    @Get()//------------------------
    async getPosts(
        @Query() query: TypePostHalper,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
            const userId: string | null = req.user ? req.user.userId : null;
        // if(!userId) throw new UnauthorizedException()
        const posts = await this.postQueryRepository.getAllPosts(query, userId);
        return posts;
    }

    // @UseGuards(BasicAuthGuard, SoftAuthGuard)
    // @Post()
    // async createPost(
    //     @Body() body: PostInputModel,
    //     @Res({ passthrough: true }) res: Response,
    //     @Req() req: Request) {
    //     const userId: string | null = req.user ? req.user.userId : null;
    //     // const createResult = await this.postService.createPost(body, body.blogId);
    //     const createResult = await this.commandBus.execute(new CreatePostCommand(body, body.blogId));
    //     if (!createResult) {
    //         throw new NotFoundException();
    //     }
    //     const newPost = await this.postQueryRepository.findPostById(createResult, userId);
    //     return newPost;
    // }

    @UseGuards(SoftAuthGuard)
    @Get(':id')//-------------------------
    async getPostById(
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
        const userId: string | null = req.user ? req.user.userId : null;
        // if(!userId) throw new UnauthorizedException()
        const postResult = await this.postQueryRepository.findPostById(id, userId);
        if (!postResult) {
            throw new NotFoundException();
        }
        return postResult;
    }
}