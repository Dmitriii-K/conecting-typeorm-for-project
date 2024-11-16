import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    // port: process.env.PORT_POSTGRESQL,
    port: 5432,
    username: 'postgres',
    password: process.env.PASSWORD_BY_DB_SQL,
    database: process.env.SQL_CONNECTION_URI,
    // autoLoadEntities: true,
    synchronize: false,
    migrations: ['src/migrations/*.ts'],
    entities: [
        'src/features/users/domain/user.typeorm.entity.ts',
        'src/features/sessions/domain/session.typeorm.entity.ts',
        'src/features/bloggers_platform/blogs/domain/blog.typeorm.entity.ts',
        'src/features/bloggers_platform/comments/domain/comment.typeorm.entity.ts',
        'src/features/bloggers_platform/likes/domain/CommentLike.typeorm.entity.ts',
        'src/features/bloggers_platform/likes/domain/PostLikes.typeorm.entity.ts',
        'src/features/bloggers_platform/posts/domain/post.typeorm.entity.ts',
    ],
    
});