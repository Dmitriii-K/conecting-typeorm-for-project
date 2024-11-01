// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// // import { Post, PostModelType } from "../../posts/domain/post.entity";
// // import { Blog, BlogModelType } from "../../blogs/domain/blog.entity";
// // import { Comment, CommentModelType } from "../../comments/domain/comment.entity";
// import { User, UserModelType } from "../../users/domain/user.entity";
// import { ApiInfo, ApiInfoModelType } from "../../auth/domain/auth.entity";
// // import { Session, SessionModelType } from "../../sessions/domain/session.entity";
// // import { Like, LikeModelType } from "../../likes/domain/likes.entity";

// @Injectable()
// export class TestingService {
//     constructor(
//     @InjectModel(User.name) private userModel: UserModelType,
//     // @InjectModel(Comment.name) private commentModel: CommentModelType,
//     // @InjectModel(Blog.name) private blogModel: BlogModelType,
//     // @InjectModel(Post.name) private postModel: PostModelType,
//     // @InjectModel(ApiInfo.name) private apiModel: ApiInfoModelType,
//     // @InjectModel(Session.name) private sessionModel: SessionModelType,
//     // @InjectModel(Like.name) private likeModel: LikeModelType,
// ) {}

//     async deleteAllData(): Promise<void> {
//     await this.userModel.deleteMany({});
//     // await this.blogModel.deleteMany({});
//     // await this.postModel.deleteMany({});
//     // await this.commentModel.deleteMany({});
//     // await this.apiModel.deleteMany({});
//     // await this.sessionModel.deleteMany({});
//     // await this.likeModel.deleteMany({});
//     console.log('All data is deleted');
//     }
// }