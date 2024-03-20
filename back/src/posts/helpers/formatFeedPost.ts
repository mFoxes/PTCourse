import { GetAllPostsDto } from "../dto/get-all-posts.dto";
import { Post } from "../posts.model";

export const formatFeedPost = (posts: Post[], userId: number) => {
    const formattedPosts: GetAllPostsDto[] = posts.map(
        (post) =>
            ({
                id: post.id,
                title: post.title,
                content: post.content,
                userId: post.userId,
                createDate: post.createDate,
                likeNum: post.likeNum,
                dislikeNum: post.dislikeNum,
                isUserLike: post.userIdLikes.includes(userId),
                isUserDislike: post.userIdDislikes.includes(userId),
            } as GetAllPostsDto)
    );
    return formattedPosts;
};
