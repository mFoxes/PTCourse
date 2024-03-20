import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { FeedPostDto } from '../../../../dto/responses/feedPost';
import { useAppDispatch } from '../../../../helpers/useAppDispatch';
import { addDislike, addLike, removeDislike, removeLike } from '../../../../stores/postsSlice';

export const Post = (post: FeedPostDto) => {
	const dispatch = useAppDispatch();

	const handleLikeClick = () => {
		if (post.isUserLike) {
			dispatch(removeLike({ postId: post.id }));
		} else {
			dispatch(addLike({ postId: post.id }));
		}
	};

	const handleDislikeClick = () => {
		if (post.isUserDislike) {
			dispatch(removeDislike({ postId: post.id }));
		} else {
			dispatch(addDislike({ postId: post.id }));
		}
	};

	return (
		<Card
			title={post.title}
			style={{ width: '100%' }}
			actions={[
				<Button
					type='text'
					onClick={handleLikeClick}
					icon={<LikeOutlined style={{ color: post.isUserLike ? 'blue' : '' }} />}
					key='like'
				>
					{post.likeNum}
				</Button>,
				<Button
					type='text'
					onClick={handleDislikeClick}
					icon={<DislikeOutlined style={{ color: post.isUserDislike ? 'blue' : '' }} />}
					key='dislike'
				>
					{post.dislikeNum}
				</Button>,
			]}
		>
			{post.content}
		</Card>
	);
};
