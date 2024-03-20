import { PostCreateDto } from '../dto/postCreate/postCreate';
import { FeedPostDto } from '../dto/responses/feedPost';
import api from './basic/api';

export const postsApi = {
	getAllPosts: () => {
		return api.get<FeedPostDto[]>('posts');
	},
	createPost: (post: PostCreateDto) => {
		return api.post<FeedPostDto>('posts/create', post);
	},
	addLike: (params: { postId: number }) => {
		return api.put<FeedPostDto>('posts/like', {}, { params });
	},
	removeLike: (params: { postId: number }) => {
		return api.delete<FeedPostDto>('posts/like', { params });
	},
	addDislike: (params: { postId: number }) => {
		return api.put<FeedPostDto>('posts/dislike', {}, { params });
	},
	removeDislike: (params: { postId: number }) => {
		return api.delete<FeedPostDto>('posts/dislike', { params });
	},
};
