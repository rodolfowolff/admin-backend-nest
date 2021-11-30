import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUsers } from './interfaces/users.interface';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Users } from './schemas/users.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

    public async findAll(paginationQuery: PaginationQueryDto): Promise<IUsers[]> {
      const { limit, offset } = paginationQuery;
      
      return await this.userModel
        .find()
        .skip(offset)
        .limit(limit)
        .exec();
    }

    public async findOne(cod: string): Promise<IUsers> {
      const user = await this.userModel
        .findOne({ cod })
        .exec();

      if (!user) {
        throw new NotFoundException(`User id: ${cod} not found`);
      }
      return user;
    }

    public async createUser(createUserDto: CreateUserDto): Promise<IUsers> {
      const createdUser = await this.userModel.create(createUserDto);
      return createdUser;
    }

    public async update(cod: string, updateUserDto: UpdateUserDto): Promise<IUsers> {
      const updatedUser = await this.userModel
        .findOneAndUpdate({ cod },
          updateUserDto,
          { new: true }
        );

      if (!updatedUser) {
        throw new NotFoundException(`User id: ${cod} not found`);
      }
      return updatedUser;

    }

    public async delete(cod: string): Promise<IUsers> {
      const deletedUser = await this.userModel
        .findOneAndRemove({ cod });

      if (!deletedUser) {
        throw new NotFoundException(`User id: ${cod} not found`);
      }
      return deletedUser;
    }
}
