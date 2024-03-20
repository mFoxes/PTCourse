import React from 'react';
import { AppHeader } from '../header/appHeader';
import { Outlet } from 'react-router-dom';

export const AppRouterWrapper = () => {
	return (
		<>
			<AppHeader />
			<Outlet />
		</>
	);
};
