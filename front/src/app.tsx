import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import './index.css';
import Login from './pages/login/login';
import Main from './pages/main/main';
import { Header } from 'antd/es/layout/layout';
import { AppHeader } from './components/header/appHeader';
import { AppRouterWrapper } from './components/appRouterWrapper/appRouterWrapper';

const router = createBrowserRouter([
	{
		element: <AppRouterWrapper />,
		children: [
			{
				path: '/',
				element: <Main />,
			},
			{
				path: '/login',
				element: <Login />,
			},
		],
	},
]);

const App = () => {
	return (
		<AppContainer>
			<RouterProvider router={router} />
		</AppContainer>
	);
};

const AppContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`;

export default App;
