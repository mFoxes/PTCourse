/* eslint-disable testing-library/prefer-screen-queries */
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoadingState } from '../../constants/loadingState';
import { setupStore } from '../../store';
import { renderWithProviders } from '../../testsHelpers/test-unils';
import Main from './main';
import { getAllPosts } from '../../stores/postsSlice';

const mockedAxios = new MockAdapter(axios);

const testData = [
	{
		id: 0,
		title: 'testing string',
		content: 'string',
		likeNum: 0,
		isUserLike: false,
		dislikeNum: 0,
		isUserDislike: false,
	},
];

const mockNetworkRequests = () => {
	mockedAxios.onGet('http://localhost:5000/posts').reply(200, testData);
};

const unMockNetworkRequests = () => {
	mockedAxios.resetHistory();
};

describe('Тестирование главной страницы', () => {
	beforeEach(() => {
		mockNetworkRequests();
	});

	afterEach(() => {
		unMockNetworkRequests();
	});

	test('Рендер поста', async () => {
		const { findByText } = renderWithProviders(<Main />, {
			preloadedState: {
				user: {
					userDto: null,
					isAuthorized: true,
					isLoading: LoadingState.fulfilled,
				},
				posts: {
					posts: testData,
					isLoading: LoadingState.fulfilled,
					isModalLoading: LoadingState.fulfilled,
				},
			},
		});

		expect(await findByText('testing string')).toBeInTheDocument();
	});
	test('Отображение главной страницы при авторизации', async () => {
		const { findByText } = renderWithProviders(<Main />, {
			preloadedState: {
				user: {
					userDto: null,
					isAuthorized: true,
					isLoading: LoadingState.fulfilled,
				},
			},
		});

		expect(await findByText('Создать пост')).toBeInTheDocument();
	});
	test('Загрузка постов', async () => {
		const { data } = await axios.get(`http://localhost:5000/posts`);

		expect(data).toEqual(testData);
	});
});
