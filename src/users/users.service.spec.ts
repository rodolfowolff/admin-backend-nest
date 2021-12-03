import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { IUsers } from './interfaces/users.interface';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

const mockUser: any = {
  cod: '111',
  username: 'Name',
  password: '12345',
  email: '1test@example.it',
  dateofbirth: '11/13/1981',
  address: ['address 123'],
  githubusername: 'github username',
};

const mockUserUpdate: any = {
  cod: '111',
  username: 'Name',
  password: '12345',
  email: '1test@example.it',
  dateofbirth: '11/13/1981',
  address: ['address 123'],
  githubusername: 'github username',
};

const usersArray = [
{
  cod: '111',
  username: 'Name',
  password: '12345',
  email: '1test@example.it',
  dateofbirth: '11/13/1981',
  address: ['address #12'],
  githubusername: 'github username',
},
{
  cod: '112',
  username: 'Name',
  password: '12345',
  email: '2test@example.it',
  dateofbirth: '12/13/1981',
  address: ['address #2'],
  githubusername: 'github username2',
}
];

const createUserDto: CreateUserDto = {
  cod: '112',
  username: 'firstName #1',
  password: 'lastName#1',
  email: 'test@example.it',
  dateofbirth: new Date('11/13/1981'),
  address: ['address #1'],
  githubusername: 'github username2',
};

const updateUserDto: CreateUserDto = {
  cod: '1122',
  username: 'firstName #2',
  password: 'lastName#2',
  email: 'test@example.it',
  dateofbirth: new Date('12/13/1981'),
  address: ['address #2'],
  githubusername: 'github username3',
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<IUsers>;

  const paginationQueryDto: PaginationQueryDto = {
    limit: 10,
    offset: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('Users'),
          useValue: {
            find: jest.fn().mockReturnValue(usersArray),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            create: jest.fn().mockResolvedValue(createUserDto),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
            populate: jest.fn(),
            skip: jest.fn(),
            offset: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<IUsers>>(getModelToken('Users'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return all users', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(usersArray),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
      } as any);
      const users = await service.findAll(paginationQueryDto);
      expect(users).toEqual(usersArray);
    });
  });

  describe('findOne()', () => {
    it('should return one User', async () => {
      const findSpy = jest.spyOn(model, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
        populate: jest.fn().mockReturnThis(),
      } as any);
      const response = await service.findOne('111');
      expect(findSpy).toHaveBeenCalledWith({ cod: '111' });
      expect(response).toEqual(mockUser);
    });

    it('should throw if find one User throws', async () => {
      jest.spyOn(model, 'findOne').mockReturnValueOnce({
        exec: jest.fn(() => null),
        populate: jest.fn().mockReturnThis(),
      } as any);
      await expect(service.findOne('11231')).rejects.toThrow(
        new NotFoundException('User id: 11231 not found'),
      );
    });
  });

  describe('createUser()', () => {
    it('should insert a new organization', async () => {
      jest.spyOn(model, 'create').mockImplementationOnce(() =>
        Promise.resolve({
          cod: '111',
          username: 'Name',
          password: '12345',
          email: '1test@example.it',
          dateofbirth: new Date('11/13/1981'),
          address: ['address 123'],
          githubusername: 'github username',
        }),
      );
      const newUser = await service.createUser({
        cod: '111',
        username: 'Name',
        password: '12345',
        email: '1test@example.it',
        dateofbirth: new Date('11/13/1981'),
        address: ['address 123'],
        githubusername: 'github username',
      });
      expect(newUser).toEqual({
        cod: '111',
        username: 'Name',
        password: '12345',
        email: '1test@example.it',
        dateofbirth: new Date('11/13/1981'),
        address: ['address 123'],
        githubusername: 'github username',
      });
    });
  });

  describe('update()', () => {
    it('should throw if CustomerSchema throws', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(
          new NotFoundException('111 not found'),
        );
      await expect(service.update('111', updateUserDto)).rejects.toThrow(
        new NotFoundException('111 not found'),
      );
    });
  });

  describe('remove()', () => {
    it('should throw if CustomerSchema remove throws', async () => {
      jest.spyOn(service, 'remove')
          .mockRejectedValueOnce(new NotFoundException());
      await expect(service.remove('anyid')).rejects.toThrow(
        new NotFoundException(),
      );
    });
  });

});

