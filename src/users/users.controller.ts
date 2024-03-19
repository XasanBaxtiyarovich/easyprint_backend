import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';

import { Users } from './entities';
import { UsersService } from './users.service';
import { SignInDto, SignUpDto, UpdatePassDto, UpdateUserDto } from './dto';
import { UserGuard, AuthenticatedRequest } from 'src/guards/user-guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "User sign up" })
  @ApiResponse({ status: 200, type: Users })
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  user_signup(
      @UploadedFile() image: any,
      @Body() signUpDto: SignUpDto
  ): Promise<Object> {
      return this.usersService.user_signup(signUpDto, image)
  }

  @ApiOperation({summary: "User sign in"})
  @ApiResponse({ status: 200, type: Users })
  @Post('signin')
  user_signin(
      @Body() signInDto: SignInDto
  ): Promise<Object> {
      return this.usersService.user_signin(signInDto)
  }

  @ApiOperation({ summary: "Find all users" })
  @ApiResponse({ status: 200, type: [ Users ] })
  @Get('findAll')
  find_users(): Promise<Object> {
      return this.usersService.find_users()
  }

  @ApiOperation({ summary: "Find one user" })
  @ApiResponse({ status: 200, type: Users})
  @Get('find/:id')
  find_user(
      @Param('id') id: number
  ): Promise<Object> {
      return this.usersService.find_user(id)
  }

  @Get('find_by_token')
  @UseGuards(UserGuard)
  async findUserById(
      @Req() req: AuthenticatedRequest // Используйте тип AuthenticatedRequest для req
  ): Promise<Object> {
      const user = req.user; // Получение объекта пользователя из запроса

      return user;
  }

  @ApiOperation({ summary: "Update one user date" })
  @ApiResponse({ status: 200, type: Users })
  @Post('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  update_user_date(
      @Param('id') id: number,
      @UploadedFile() image: any,
      @Body() updateUserDto: UpdateUserDto
  ): Promise<Object> {
      return this.usersService.update_user_date(id, updateUserDto, image)
  }

  @ApiOperation({ summary: "Update one user password" })
  @ApiResponse({ status: 200, type: Users })
  @Post('update-pass')
  update_user_pass(
      @Body() updatePassDto: UpdatePassDto
  ): Promise<Object> {
      return this.usersService.update_user_pass(updatePassDto, updatePassDto.token);
  }

  @ApiOperation({summary:"Remove one user"})
  @ApiResponse({status:200})
  @Delete('delete/:id')
  remove_user(
      @Param('id') id: number,
  ): Promise<Object | Number>{
      return this.usersService.remove_user(id)
  }

  @ApiOperation({summary: 'update active user'})
  @ApiResponse({status: 200, type: Users})
  @Get('actived-or-notactivated/:token')
  active(
    @Param('token') token: string
  ): Promise<Object> {
    return this.usersService.active(token)
  }

  @ApiOperation({summary: 'update active user by id'})
  @ApiResponse({status: 200, type: Users})
  @Get('actived-or-notactivated-id/:id')
  active_id(
    @Param('id') id: number
  ): Promise<Object> {
    return this.usersService.active_id(id)
  }
}
