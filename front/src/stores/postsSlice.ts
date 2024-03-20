import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postsApi } from '../api/postsApi';
import { LoadingState } from '../constants/loadingState';
import { FeedPostDto } from '../dto/responses/feedPost';
import { PostCreateDto } from '../dto/postCreate/postCreate';

const sliceName = 'posts';

export interface InitialState {
	posts: FeedPostDto[];

	isLoading: LoadingState;
	isModalLoading: LoadingState;
}

const initialState: InitialState = {
	posts: [],

	isLoading: LoadingState.empty,
	isModalLoading: LoadingState.empty,
};

export const getAllPosts = createAsyncThunk<FeedPostDto[]>(`${sliceName}/getAllPosts`, async (_, thunkApi) => {
	try {
		const response = await postsApi.getAllPosts();
		return response.data;
	} catch (e) {
		throw thunkApi.rejectWithValue(e);
	}
});

export const createPost = createAsyncThunk<FeedPostDto, PostCreateDto>(
	`${sliceName}/createPost`,
	async (parameters, thunkApi) => {
		try {
			const response = await postsApi.createPost(parameters);
			return response.data;
		} catch (e) {
			throw thunkApi.rejectWithValue(e);
		}
	},
);

export const addLike = createAsyncThunk<FeedPostDto, { postId: number }>(
	`${sliceName}/addLike`,
	async (parameters, thunkApi) => {
		try {
			const response = await postsApi.addLike(parameters);
			return response.data;
		} catch (e) {
			throw thunkApi.rejectWithValue(e);
		}
	},
);

export const removeLike = createAsyncThunk<FeedPostDto, { postId: number }>(
	`${sliceName}/removeLike`,
	async (parameters, thunkApi) => {
		try {
			const response = await postsApi.removeLike(parameters);
			return response.data;
		} catch (e) {
			throw thunkApi.rejectWithValue(e);
		}
	},
);

export const addDislike = createAsyncThunk<FeedPostDto, { postId: number }>(
	`${sliceName}/addDislike`,
	async (parameters, thunkApi) => {
		try {
			const response = await postsApi.addDislike(parameters);
			return response.data;
		} catch (e) {
			throw thunkApi.rejectWithValue(e);
		}
	},
);

export const removeDislike = createAsyncThunk<FeedPostDto, { postId: number }>(
	`${sliceName}/removeDislike`,
	async (parameters, thunkApi) => {
		try {
			const response = await postsApi.removeDislike(parameters);
			return response.data;
		} catch (e) {
			throw thunkApi.rejectWithValue(e);
		}
	},
);

export const postsSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllPosts.pending, (state) => {
			state.isLoading = LoadingState.pending;
		});
		builder.addCase(getAllPosts.fulfilled, (state, action) => {
			state.posts = action.payload;
			state.isLoading = LoadingState.fulfilled;
		});
		builder.addCase(getAllPosts.rejected, (state) => {
			state.isLoading = LoadingState.rejected;
		});

		builder.addCase(createPost.pending, (state) => {
			state.isModalLoading = LoadingState.pending;
		});
		builder.addCase(createPost.fulfilled, (state) => {
			state.isModalLoading = LoadingState.fulfilled;
		});
		builder.addCase(createPost.rejected, (state) => {
			state.isModalLoading = LoadingState.rejected;
		});

		builder.addCase(addLike.pending, (state) => {
			state.isLoading = LoadingState.pending;
		});
		builder.addCase(addLike.fulfilled, (state, action) => {
			state.posts = state.posts.map((post) => (post.id === action.payload.id ? action.payload : post));
			state.isLoading = LoadingState.fulfilled;
		});
		builder.addCase(addLike.rejected, (state) => {
			state.isLoading = LoadingState.rejected;
		});

		builder.addCase(removeLike.pending, (state) => {
			state.isLoading = LoadingState.pending;
		});
		builder.addCase(removeLike.fulfilled, (state, action) => {
			state.posts = state.posts.map((post) => (post.id === action.payload.id ? action.payload : post));
			state.isLoading = LoadingState.fulfilled;
		});
		builder.addCase(removeLike.rejected, (state) => {
			state.isLoading = LoadingState.rejected;
		});

		builder.addCase(addDislike.pending, (state) => {
			state.isLoading = LoadingState.pending;
		});
		builder.addCase(addDislike.fulfilled, (state, action) => {
			state.posts = state.posts.map((post) => (post.id === action.payload.id ? action.payload : post));
			state.isLoading = LoadingState.fulfilled;
		});
		builder.addCase(addDislike.rejected, (state) => {
			state.isLoading = LoadingState.rejected;
		});

		builder.addCase(removeDislike.pending, (state) => {
			state.isLoading = LoadingState.pending;
		});
		builder.addCase(removeDislike.fulfilled, (state, action) => {
			state.posts = state.posts.map((post) => (post.id === action.payload.id ? action.payload : post));
			state.isLoading = LoadingState.fulfilled;
		});
		builder.addCase(removeDislike.rejected, (state) => {
			state.isLoading = LoadingState.rejected;
		});
	},
});

// export const {} = postsSlice.actions;

export default postsSlice.reducer;
