import { CanActivate } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { FeedPost } from "./dto/get-all-posts.dto";
import { PostsController } from "./posts.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { PostsService } from "./posts.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Repository } from "sequelize-typescript";
import { CreatePostDto } from "./dto/create-post.dto";
import { User } from "../users/users.model";
import { Post } from "./posts.model";
import { repositoryMockFactory } from "../helpers/repositoryMockFactory";

describe("PostsController", () => {
    let postsController: PostsController;
    let postsService: PostsService;

    beforeEach(async () => {
        const mock_ForceFailGuard: CanActivate = {
            canActivate: jest.fn(() => true),
        };

        const app: TestingModule = await Test.createTestingModule({
            controllers: [PostsController],
            providers: [
                PostsService,
                {
                    provide: getRepositoryToken(Post),
                    useFactory: repositoryMockFactory,
                },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue(mock_ForceFailGuard)

            .compile();

        postsController = app.get<PostsController>(PostsController);
        postsService = app.get<PostsService>(PostsService);
    });

    describe("findAll", () => {
        it("Возвращает правильный массив", async () => {
            const result: FeedPost[] = [
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
            ];
            jest.spyOn(postsService, "getAllPosts").mockImplementation(
                async () => result
            );
            expect(await postsController.getPosts({ user: { id: 0 } })).toBe(
                result
            );
        });
        it("Возвращает не правильный массив", async () => {
            const result: FeedPost[] = [
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
            ];
            const wrongResult: FeedPost[] = [
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
            ];
            jest.spyOn(postsService, "getAllPosts").mockImplementation(
                async () => result
            );
            expect(
                await postsController.getPosts({ user: { id: 0 } })
            ).not.toBe(wrongResult);
        });
    });

    describe("create", () => {
        it("Правильно создаёт", async () => {
            const createDto: CreatePostDto = {
                title: "string",
                content: "string",
                userId: 0,
            };
            const result = {
                id: 0,
                title: "stringdsad",
                content: "stringsadsad",
                userId: 2,
                createDate: new Date(),
                likeNum: 0,
                userIdLikes: [],
                dislikeNum: 1,
                userIdDislikes: [1],
            } as Post;
            jest.spyOn(postsService, "create").mockImplementation(
                async () => result
            );
            expect(
                await postsController.createPost(createDto, { user: { id: 0 } })
            ).toBe(result);
        });
        it("Не правильно создаёт", async () => {
            const createDto: CreatePostDto = {
                title: "string",
                content: "string",
                userId: 0,
            };
            const result = {
                id: 0,
                title: "stringdsad",
                content: "stringsadsad",
                userId: 2,
                createDate: new Date(),
                likeNum: 0,
                userIdLikes: [],
                dislikeNum: 1,
                userIdDislikes: [1],
            } as Post;
            const wrongResult = {
                id: 0,
                title: "stringdsad",
                content: "stringsadsad",
                userId: 2,
                createDate: new Date(),
                likeNum: 0,
                userIdLikes: [],
                dislikeNum: 1,
                userIdDislikes: [1],
            } as Post;
            jest.spyOn(postsService, "create").mockImplementation(
                async () => result
            );
            expect(
                await postsController.createPost(createDto, { user: { id: 0 } })
            ).not.toBe(wrongResult);
        });
    });
});
