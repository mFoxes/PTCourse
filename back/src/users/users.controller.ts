import {Body, Controller, Get, Post, Query, Req, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import { DataType } from 'sequelize-typescript';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}


    @ApiOperation({summary: 'Получение данных пользователя'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Get('getUser')
    getUser(@Req() request) {
        return this.usersService.getUserByEmail(request.user.email);
    }

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Получить всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Получить общее количество лайков пользователя'})
    @ApiResponse({status: 200, type: DataType.INTEGER})
    @UseGuards(JwtAuthGuard)
    @Get('/likes')
    getLikesCount(@Query('userId') userId: number) {
        return this.usersService.getLikesCount(userId);
    }

    @ApiOperation({summary: 'Получить общее количество дизлайков пользователя'})
    @ApiResponse({status: 200, type: DataType.INTEGER})
    @UseGuards(JwtAuthGuard)
    @Get('/dislikes')
    getDislikesCount(@Query('userId') userId: number) {
        return this.usersService.getDislikesCount(userId);
    }
}
