import { CreatePostDto } from "../dto/create-post.dto";
import { FeedPost } from "../dto/get-all-posts.dto";
import { Post } from "../posts.model";

export const findAllPostsTestDtos = {
    result: [
        {
            id: 1,
            title: "string",
            content: "string",
            userId: 1,
            createDate: new Date(),
            likeNum: 0,
            isUserLike: false,
            dislikeNum: 1,
            isUserDislike: true,
        },
    ] as FeedPost[],

    wrongResult: [
        {
            id: 0,
            title: "stringdsad",
            content: "stringsadsad",
            userId: 1,
            createDate: new Date(),
            likeNum: 0,
            isUserLike: false,
            dislikeNum: 1,
            isUserDislike: true,
        },
    ] as FeedPost[],
};

export const createPostsTestDtos = {
    createDto: {
        title: "string",
        content: "string",
        userId: 0,
    } as CreatePostDto,
    result: {
        id: 0,
        title: "stringdsad",
        content: "stringsadsad",
        userId: 2,
        createDate: new Date(),
        likeNum: 0,
        userIdLikes: [],
        dislikeNum: 1,
        userIdDislikes: [1],
    } as Post,
    wrongResult: {
        id: 0,
        title: "stringdsad",
        content: "stringsadsad",
        userId: 2,
        createDate: new Date(),
        likeNum: 0,
        userIdLikes: [],
        dislikeNum: 1,
        userIdDislikes: [1],
    } as Post,
};
