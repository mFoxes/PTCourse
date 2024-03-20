import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({
            include: { all: true },
        });
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        });
        return user;
    }

    async getLikesCount(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
            include: { all: true },
        });
        const count = user.posts.reduce((acc, post) => {
            return acc + post.likeNum;
        }, 0);
        return count;
    }

    async getDislikesCount(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
            include: { all: true },
        });
        const count = user.posts.reduce((acc, post) => {
            return acc + post.dislikeNum;
        }, 0);
        return count;
    }
}
