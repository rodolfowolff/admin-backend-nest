import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Param,
  Query,
  Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  public async getAllUsers(
    @Res() res,
    @Query() paginationQuery: PaginationQueryDto) {
    try {
      const users = await this.usersService.findAll(paginationQuery);
      if (!users) {
        throw new NotFoundException('Users does not exist!');
      }
      res.status(HttpStatus.OK).json(users);
    }
    catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
  
  @Get(':cod')
  public async getUser(
    @Res() res,
    @Param('cod') cod: string) {
    if (!cod) {
      throw new NotFoundException('Invalid id!');
    }
    try {
      const user = await this.usersService.findOne(cod);
      if (!user) {
        throw new NotFoundException('User does not exist!');
      }
      return res.status(HttpStatus.OK).json(user);
    }
    catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  public async createUser(
    @Res() res,
    @Body() createUserDto: CreateUserDto) {
      try {
        const createdUser = await this.usersService.createUser(createUserDto);
        return res.status(HttpStatus.CREATED).json({
          message: 'User has been submitted successfully!',
          createdUser
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message
      });
    }
  }

  @Put(':cod')
  public async updateUser(
    @Res() res,
    @Param('cod') cod: string,
    @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersService.update(cod, updateUserDto);
      if (!updatedUser) {
        throw new NotFoundException('User id does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        updatedUser
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message
      });
    }
  }

  @Delete(':cod')
  public async deleteUser(
    @Res() res,
    @Param('cod') cod: string) {
    try {
      const deletedUser = await this.usersService.remove(cod);
      if (!deletedUser) {
        throw new NotFoundException('User id does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'User has been deleted!',
        deletedUser
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message
      });
    }
  }

}