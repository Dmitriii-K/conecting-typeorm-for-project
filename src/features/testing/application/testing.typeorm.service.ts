import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/domain/user.typeorm.entity';
import { Session } from '../../sessions/domain/session.typeorm.entity';

@Injectable()
export class TestingService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Session) private sessionsRepository: Repository<Session>,
        // @InjectRepository(Blogs) private blogsRepository: Repository<Blogs>,
        // @InjectRepository(Posts) private postsRepository: Repository<Posts>,
        // @InjectRepository(Comments) private commentsRepository: Repository<Comments>,
        // @InjectRepository(PostsLikes) private postsLikesRepository: Repository<PostsLikes>,
        // @InjectRepository(CommentsLikes) private commentsLikesRepository: Repository<CommentsLikes>,
    ) {}

    async deleteAllData(): Promise<void> {
        // await this.commentsLikesRepository.delete({});
        // await this.postsLikesRepository.delete({});
        // await this.commentsRepository.delete({});
        // await this.postsRepository.delete({});
        await this.sessionsRepository.delete({});
        // await this.blogsRepository.delete({});
        await this.usersRepository.delete({});
        console.log('All data of tables is deleted');
    }
}