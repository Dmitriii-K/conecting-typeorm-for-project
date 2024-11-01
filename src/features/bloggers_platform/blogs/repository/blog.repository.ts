// import { Injectable } from "@nestjs/common";
// import { BlogInputModel } from "../api/models/input.model";
// import { InjectModel } from "@nestjs/mongoose";
// import { Blog, BlogModelType } from "../domain/blog.entity";


// @Injectable()
// export class BlogRepository {
//     constructor(@InjectModel(Blog.name) private blogModel: BlogModelType) {}

//     async insertBlog(data: Blog) {
//         const result = this.blogModel.create(data);
//         return (await result)._id.toString();
//     }
//     async findBlogById(blogId: string) {
//         return this.blogModel.findOne({ _id: blogId });
//     }
//     async updateBlog(blogId: string, updateContent: BlogInputModel) {
//         const updateResult = await this.blogModel.updateOne({ _id: blogId }, { $set: updateContent });
//         return updateResult.modifiedCount === 1;
//     }
//     async deleteBlog(blogId: string) {
//         const result = await this.blogModel.deleteOne({ _id: blogId });
//         return result.deletedCount === 1;
//     }
//     async blogIsExist (id: string): Promise<boolean> {
//         return !!(await this.blogModel.countDocuments({_id: id}));
//     }
//     async findBlogNameForId(BlogId: string) {
//         return this.blogModel.findOne({ _id: BlogId });
//     }
// }