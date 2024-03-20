export interface FeedPostDto {
	id: number;
	title: string;
	content: string;
	createDate?: Date;

	likeNum: number;
	isUserLike: boolean;

	dislikeNum: number;
	isUserDislike: boolean;
}
