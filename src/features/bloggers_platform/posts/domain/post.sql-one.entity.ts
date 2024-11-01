import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { randomUUID } from 'crypto';

@Entity()
class NewestLikes {
    @PrimaryColumn('uuid')
    id: string;

    // @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    @CreateDateColumn()
    addedAt: Date;

    @Column({ type: 'varchar', nullable: false })
    userId: string;

    @Column({ type: 'varchar', nullable: false })
    login: string;
}

@Entity()
class ExtendedLikesInfo {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ type: 'int', nullable: false, default: 0 })
    likesCount: number;

    @Column({ type: 'int', nullable: false, default: 0 })
    dislikesCount: number;

    @Column(() => NewestLikes)
    newestLikes: NewestLikes[];
}

@Entity()
export class Post {
    @PrimaryColumn('uuid')
    id: string;//

    @Column({ type: 'varchar', nullable: false })
    title: string;//

    @Column({ type: 'text', nullable: false })
    shortDescription: string;//

    @Column({ type: 'text', nullable: false })
    content: string;//

    @Column({ type: 'uuid', nullable: false })
    blogId: string;//

    @Column({ type: 'varchar', nullable: false })
    blogName: string;

    // @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    @CreateDateColumn()
    createdAt: Date;//

    @Column(() => ExtendedLikesInfo)
    extendedLikesInfo: ExtendedLikesInfo;

    static createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string): Post {
        const post = new Post();
        
        post.id = randomUUID();
        post.title = title;
        post.shortDescription = shortDescription;
        post.content = content;
        post.blogId = blogId;
        post.blogName = blogName;
        post.createdAt = new Date();
        post.extendedLikesInfo = new ExtendedLikesInfo();
        post.extendedLikesInfo.likesCount = 0;
        post.extendedLikesInfo.dislikesCount = 0;
        post.extendedLikesInfo.newestLikes = [];

        return post;
    }
}