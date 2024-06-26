import { Module, forwardRef } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { Post } from "./posts.model";
import { AuthModule } from "src/auth/auth.module";
import { PostsFilterStrategy } from "src/patterns/postsFilterStrategy/postsFilterStrategy";

@Module({
    providers: [PostsService],
    controllers: [PostsController],
    imports: [
        SequelizeModule.forFeature([User, Post]),
        forwardRef(() => AuthModule),
        PostsFilterStrategy,
    ],
})
export class PostsModule {}
