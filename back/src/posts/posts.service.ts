import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./posts.model";
import { FeedPost } from "./dto/get-all-posts.dto";
import { formatFeedPost } from "./helpers/formatFeedPost";
import { PostsFilterStrategy } from "src/patterns/postsFilterStrategy/postsFilterStrategy";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private postsFilterStrategy: PostsFilterStrategy
    ) {}

    async getAllPosts(userId: number) {
        const posts = await this.postRepository.findAll({
            include: { all: true },
        });

        const formattedPosts = formatFeedPost(posts, userId);
        const filteringPosts = this.postsFilterStrategy.filterPosts(
            formattedPosts,
            {}
        );
        return filteringPosts;
    }

    async create(dto: CreatePostDto, userId: number) {
        const post = await this.postRepository.create({
            ...dto,
            userId: userId,
            createDate: new Date(),
            likeNum: 0,
            userIdLikes: [],
            dislikeNum: 0,
            userIdDislikes: [],
        });

        return post;
    }

    async addLike(postId: number, userId: number) {
        const post = await this.postRepository.findOne({
            where: { id: postId },
        });
        if (!(userId in post.userIdLikes)) {
            await post.update({
                likeNum: post.likeNum + 1 ?? 1,
                userIdLikes: [...post.userIdLikes, userId],
            });
        }

        const formattedPosts = formatFeedPost([post], userId);
        return formattedPosts[0];
    }

    async removeLike(postId: number, userId: number) {
        const post = await this.postRepository.findOne({
            where: { id: postId },
        });
        if (post.userIdLikes.includes(userId)) {
            await post.update({
                likeNum: post.likeNum - 1,
                userIdLikes: post.userIdLikes.filter((id) => id !== userId),
            });
        }

        const formattedPosts = formatFeedPost([post], userId);
        return formattedPosts[0];
    }

    async addDislike(postId: number, userId: number) {
        const post = await this.postRepository.findOne({
            where: { id: postId },
        });
        if (!(userId in post.userIdDislikes)) {
            await post.update({
                dislikeNum: post.dislikeNum + 1 ?? 1,
                userIdDislikes: [...post.userIdDislikes, userId],
            });
        }

        const formattedPosts = formatFeedPost([post], userId);
        return formattedPosts[0];
    }

    async removeDislike(postId: number, userId: number) {
        const post = await this.postRepository.findOne({
            where: { id: postId },
        });
        if (post.userIdDislikes.includes(userId)) {
            await post.update({
                dislikeNum: post.dislikeNum - 1,
                userIdDislikes: post.userIdDislikes.filter(
                    (id) => id !== userId
                ),
            });
        }

        const formattedPosts = formatFeedPost([post], userId);
        console.log("post", post);
        console.log("formattedPosts", formattedPosts);
        return formattedPosts[0];
    }
}
