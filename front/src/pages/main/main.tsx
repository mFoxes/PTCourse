import { Button, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Container } from '../../components/container/container';
import { LoadingState } from '../../constants/loadingState';
import { useAppDispatch } from '../../helpers/useAppDispatch';
import { useAppSelector } from '../../helpers/useAppSelector';
import { getUser } from '../../stores/userSlice';
import { Post } from './components/post/post';
import { getAllPosts } from '../../stores/postsSlice';
import { PostCreateModal } from './components/postCreateModal/postCreateModal';
import styled from 'styled-components';

const Main = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const dispatch = useAppDispatch();
	const posts = useAppSelector((state) => state.posts.posts);

	const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

	const isUserLoading = useAppSelector((state) => state.user.isLoading);
	const isPostsLoading = useAppSelector((state) => state.posts.isLoading);

	const handleModalOpen = () => {
		setModalIsOpen(true);
	};

	const handleModalClose = () => {
		setModalIsOpen(false);
	};

	const handleModalSuccess = () => {
		dispatch(getAllPosts());
		handleModalClose();
	};

	useEffect(() => {
		dispatch(getUser());
		dispatch(getAllPosts());
	}, []);

	if (isUserLoading === LoadingState.pending || isPostsLoading === LoadingState.pending) {
		return <Spin />;
	}

	if (!isAuthorized) {
		return <></>;
	}

	return (
		<>
			<Container>
				<MainContainer>
					<Button onClick={handleModalOpen}>Создать пост</Button>
					<ContentContainer>
						{posts.map((post, indx) => (
							<Post {...post} key={indx} />
						))}
					</ContentContainer>
				</MainContainer>
			</Container>
			{modalIsOpen && <PostCreateModal onClose={handleModalClose} onSuccess={handleModalSuccess} />}
		</>
	);
};

const MainContainer = styled(Space)`
	display: flex;
	flex-direction: column;
	& > .ant-space-item {
		width: 100%;
	}
`;

const ContentContainer = styled(Space)`
	display: flex;
	flex-wrap: wrap;
	flex: 1 1 100%;
	& > .ant-space-item {
		flex: 0 1 calc(25% - 8px);
	}
`;

export default Main;
