import { Button, Checkbox, Form, Input, Space } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LoginDto } from '../../dto/authorization/login';
import { useAppDispatch } from '../../helpers/useAppDispatch';
import { getUser, login, registration } from '../../stores/userSlice';
import { useAppSelector } from '../../helpers/useAppSelector';
import { useForm } from 'antd/es/form/Form';

const Login = () => {
	const [form] = useForm();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isAuthorized = useAppSelector((state) => state.user.isAuthorized);
	const userDto = useAppSelector((state) => state.user.userDto);

	const onFinish = async (value: LoginDto & { registration?: boolean }) => {
		console.log('value', value);
		if (value.registration) {
			dispatch(registration(value));
		} else {
			dispatch(login(value));
		}
	};

	useEffect(() => {
		if (isAuthorized) {
			dispatch(getUser());
		}
	}, [isAuthorized]);

	useEffect(() => {
		if (userDto !== null) {
			navigate('/');
		}
	}, [userDto]);

	return (
		<LoginContainer>
			<Form form={form} layout='vertical' onFinish={onFinish}>
				<Form.Item name='email' label='Логин'>
					<Input />
				</Form.Item>

				<Form.Item name='password' label='Пароль'>
					<Input type='password' />
				</Form.Item>

				<Form.Item name='registration' hidden>
					<Checkbox value={false} />
				</Form.Item>

				<ButtonsContainer>
					<Form.Item>
						<Button htmlType='submit'>Вход</Button>
					</Form.Item>
					<Form.Item>
						<Button
							onClick={() => {
								form.setFieldValue('registration', true);
								form.submit();
							}}
						>
							Регистрация
						</Button>
					</Form.Item>
				</ButtonsContainer>
			</Form>
		</LoginContainer>
	);
};

const LoginContainer = styled(Space)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1 1 100%;
`;

const ButtonsContainer = styled(Space)`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default Login;
