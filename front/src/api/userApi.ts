import { LoginDto } from '../dto/authorization/login';
import { RegistrationDto } from '../dto/authorization/registration';
import { UserDto } from '../dto/responses/user';
import api from './basic/api';

export const userApi = {
	login: (value: LoginDto) => {
		return api.post<{ token: string }>('auth/login', value);
	},
	registration: (value: RegistrationDto) => {
		return api.post<{ token: string }>('auth/registration', value);
	},
	getUser: () => {
		return api.get<UserDto>('users/getUser');
	},
};
