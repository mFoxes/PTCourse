import { configureStore } from '@reduxjs/toolkit';
import userReducer from './stores/userSlice';
import postsReducer from './stores/postsSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		posts: postsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
