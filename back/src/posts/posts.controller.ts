import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsService } from "./posts.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Post as PostDto } from "./posts.model";
import { DataType } from "sequelize-typescript";
import { FeedPost } from "./dto/get-all-posts.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Посты")
@Controller("posts")
export class PostsController {
    constructor(private postService: PostsService) {}

    @ApiOperation({ summary: "Получение всех постов" })
    @ApiResponse({ status: 200, type: [FeedPost] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getPosts(@Req() request) {
        return this.postService.getAllPosts(request.user.id);
    }

    @ApiOperation({ summary: "Создание поста" })
    @ApiResponse({ status: 200, type: PostDto })
    @UseGuards(JwtAuthGuard)
    @Post("/create")
    createPost(@Body() dto: CreatePostDto, @Req() request) {
        return this.postService.create(dto, request.user.id);
    }

    @ApiOperation({ summary: "Добавление лайка" })
    @ApiResponse({ status: 200, type: PostDto })
    @UseGuards(JwtAuthGuard)
    @Put("/like")
    addLike(@Query("postId") postId: number, @Req() request) {
        return this.postService.addLike(postId, request.user.id);
    }

    @ApiOperation({ summary: "Удаление лайка" })
    @ApiResponse({ status: 200, type: PostDto })
    @UseGuards(JwtAuthGuard)
    @Delete("/like")
    removeLike(@Query("postId") postId: number, @Req() request) {
        return this.postService.removeLike(postId, request.user.id);
    }

    @ApiOperation({ summary: "Добавление дизлайка" })
    @ApiResponse({ status: 200, type: PostDto })
    @UseGuards(JwtAuthGuard)
    @Put("/dislike")
    addDislike(@Query("postId") postId: number, @Req() request) {
        return this.postService.addDislike(postId, request.user.id);
    }

    @ApiOperation({ summary: "Удаление дизлайка" })
    @ApiResponse({ status: 200, type: PostDto })
    @UseGuards(JwtAuthGuard)
    @Delete("/dislike")
    removeDislike(@Query("postId") postId: number, @Req() request) {
        return this.postService.removeDislike(postId, request.user.id);
    }
}
