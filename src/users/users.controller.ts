import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Patch,
  Param,
  Query,
  Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  public async getAllUsers(
    @Res() res,
    @Query() paginationQuery: PaginationQueryDto) {
    const users = await this.usersService.findAll(paginationQuery);
    return res.status(HttpStatus.OK).json(users);
  }
  
  @Get(':cod')
  public async getUser(@Res() res, @Param('cod') cod: string) {
    if (!cod) {
      throw new NotFoundException('Invalid id!');
    }
    const user = await this.usersService.findOne(cod);
    if (!user) {
      throw new NotFoundException('User id does not exist!');
    }
    return res.status(HttpStatus.OK).json(user);
  }

  @Post()
  public async createUser(
    @Res() res,
    @Body() createUserDto: CreateUserDto) {
      try {
        const createdUser = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'User has been submitted successfully!',
      createdUser
    });
  } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message
      });
    }
  }
}