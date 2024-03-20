import { Header } from 'antd/es/layout/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../helpers/useAppSelector';
import { Button, Space } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setInitialState } from '../../stores/userSlice';

export const AppHeader = () => {
	const dispatch = useDispatch();
	const userDto = useAppSelector((state) => state.user.userDto);

	const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

	const handleExit = async () => {
		await localStorage.removeItem('token');
		dispatch(setInitialState());
	};

	return (
		<Header>
			{isAuthorized ? (
				<Space style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Text>{userDto?.email}</Text>
					<Button type='text' onClick={handleExit}>
						<Text>Выйти</Text>
					</Button>
				</Space>
			) : (
				<Link to={'/login'}>
					<Text>Авторизация</Text>
				</Link>
			)}
		</Header>
	);
};

const Text = styled(Space)`
	color: white;
`;
