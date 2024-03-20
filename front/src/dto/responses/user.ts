import { PostDto } from './post';

export interface UserDto {
	id: number;
	email: string;
	password: string;

	posts: PostDto[];
}
