export class GetAllPostsDto {
    readonly id: number;
    readonly title: string;
    readonly content: string;
    readonly userId: number;
    readonly createDate: Date;

    readonly likeNum: number;
    readonly isUserLike: boolean;

    readonly dislikeNum: number;
    readonly isUserDislike: boolean;
}