import { CanActivate } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { repositoryMockFactory } from "../helpers/repositoryMockFactory";
import { PostsController } from "./posts.controller";
import { Post } from "./posts.model";
import { PostsService } from "./posts.service";
import {
    createPostsTestDtos,
    findAllPostsTestDtos,
} from "./testsDto/postTestDto";

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
            jest.spyOn(postsService, "getAllPosts").mockImplementation(
                async () => findAllPostsTestDtos.result
            );
            expect(await postsController.getPosts({ user: { id: 0 } })).toBe(
                findAllPostsTestDtos.result
            );
        });
        it("Возвращает не правильный массив", async () => {
            jest.spyOn(postsService, "getAllPosts").mockImplementation(
                async () => findAllPostsTestDtos.result
            );
            expect(
                await postsController.getPosts({ user: { id: 0 } })
            ).not.toBe(findAllPostsTestDtos.wrongResult);
        });
    });

    describe("create", () => {
        it("Правильно создаёт", async () => {
            jest.spyOn(postsService, "create").mockImplementation(
                async () => createPostsTestDtos.result
            );
            expect(
                await postsController.createPost(
                    createPostsTestDtos.createDto,
                    { user: { id: 0 } }
                )
            ).toBe(createPostsTestDtos.result);
        });
        it("Не правильно создаёт", async () => {
            jest.spyOn(postsService, "create").mockImplementation(
                async () => createPostsTestDtos.result
            );
            expect(
                await postsController.createPost(
                    createPostsTestDtos.createDto,
                    { user: { id: 0 } }
                )
            ).not.toBe(createPostsTestDtos.wrongResult);
        });
    });
});
