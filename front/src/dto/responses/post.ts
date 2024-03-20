export interface PostDto {
	id: number;

	title: string;

	content: string;

	userId: number;

	createDate: Date;

	likeNum: number;

	userIdLikes: number[];

	dislikeNum: number;

	userIdDislikes: number[];
}
