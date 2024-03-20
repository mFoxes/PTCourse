import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi';
import { LoadingState } from '../constants/loadingState';
import { LoginDto } from '../dto/authorization/login';
import { UserDto } from '../dto/responses/user';
import { AsyncLocalStorage } from 'async_hooks';

const sliceName = 'user';

export interface InitialState {
	userDto: UserDto | null;

	isAuthorized: boolean;

	isLoading: LoadingState;
}

const initialState: InitialState = {
	userDto: null,

	isAuthorized: false,

	isLoading: LoadingState.empty,
};

export const login = createAsyncThunk<{ token: string }, LoginDto>(
	`${sliceName}/login`,
	async (parameters, thunkApi) => {
		try {
			const response = await userApi.login(parameters);
			return response.data;
		} catch (e) {
			throw thunkApi.rejectWithValue(e);
		}
	},
);

export const registration = createAsyncThunk<{ token: string }, LoginDto>(
	`${sliceName}/registration`,
	async (parameters, thunkApi) => {
		try {
			const response = await userApi.registration(parameters);
			return response.data;
		} catch (e) {
			throw thunkApi.rejectWithValue(e);
		}
	},
);

export const getUser = createAsyncThunk<UserDto>(`${sliceName}/getUser`, async (_, thunkApi) => {
	try {
		const response = await userApi.getUser();
		return response.data;
	} catch (e) {
		throw thunkApi.rejectWithValue(e);
	}
});

export const userSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setInitialState: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.isLoading = LoadingState.pending;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.isAuthorized = true;
			localStorage.setItem('token', action.payload.token);
			state.isLoading = LoadingState.fulfilled;
		});
		builder.addCase(login.rejected, (state) => {
			state.isLoading = LoadingState.rejected;
		});

		builder.addCase(registration.pending, (state) => {
			state.isLoading = LoadingState.pending;
		});
		builder.addCase(registration.fulfilled, (state, action) => {
			state.isAuthorized = true;
			localStorage.setItem('token', action.payload.token);
			state.isLoading = LoadingState.fulfilled;
		});
		builder.addCase(registration.rejected, (state) => {
			state.isLoading = LoadingState.rejected;
		});

		builder.addCase(getUser.pending, (state) => {
			state.isLoading = LoadingState.pending;
		});
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.userDto = action.payload;
			state.isAuthorized = true;
			state.isLoading = LoadingState.fulfilled;
		});
		builder.addCase(getUser.rejected, (state) => {
			state.isLoading = LoadingState.rejected;
		});
	},
});

export const { setInitialState } = userSlice.actions;

export default userSlice.reducer;
