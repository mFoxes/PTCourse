import { Injectable } from "@nestjs/common";
import { FeedPost } from "src/posts/dto/get-all-posts.dto";

interface FilterParams {}

@Injectable()
export class PostsFilterStrategy {
    public async filterPosts(posts: FeedPost[], filterParams: FilterParams) {
        return posts;
    }
}
