import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './stores/userSlice';
import postsReducer from './stores/postsSlice';

export const setupStore = (preloadedState?: any) => {
	return configureStore({
		reducer: combineReducers({
			user: userReducer,
			posts: postsReducer,
		}),
		preloadedState,
	});
};

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
