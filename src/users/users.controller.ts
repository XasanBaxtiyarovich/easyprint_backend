import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { Users } from './entities';
import { UsersService } from './users.service';
import { SignInDto, SignUpDto, UpdatePassDto, UpdateUserDto } from './dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "User sign up" })
  @ApiResponse({ status: 200, type: Users })
  @Post('signup')
  user_signup(
      @Body() signUpDto: SignUpDto
  ): Promise<Object> {
      return this.usersService.user_signup(signUpDto)
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

  @ApiOperation({ summary: "Update one user date" })
  @ApiResponse({ status: 200, type: Users })
  @Put('update/:id')
  update_user_date(
      @Param('id') id: number,
      @Body() updateUserDto: UpdateUserDto
  ): Promise<Object> {
      return this.usersService.update_user_date(id, updateUserDto)
  }

  @ApiOperation({ summary: "Update one user password" })
  @ApiResponse({ status: 200, type: Users })
  @Put('update-pass/:id')
  update_user_pass(
      @Param('id') id: number,
      @Body() updatePassDto: UpdatePassDto
  ): Promise<Object> {
      return this.usersService.update_user_pass(id, updatePassDto)
  }

  @ApiOperation({summary:"Remove one user"})
  @ApiResponse({status:200})
  @Delete('delete/:id')
  remove_user(
      @Param('id') id: number,
  ): Promise<Object | Number>{
      return this.usersService.remove_user(id)
  }
}
