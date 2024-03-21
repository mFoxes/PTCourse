import { BuildOptions } from "sequelize";
import { Post } from "../../posts/posts.model";

export class PostsRepositoryStrategy {
    private _repositoryOptions: BuildOptions | undefined;
    public PostsRepositoryFactory(options: BuildOptions) {
        this._repositoryOptions = options;
    }

    public createRepository() {
        return new Post(undefined, this._repositoryOptions);
    }
}
