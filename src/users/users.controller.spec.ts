import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

class MockResponse {
  res: any;
  constructor() {
    this.res = {};
  }
  status = jest
    .fn()
    .mockReturnThis()
    .mockImplementationOnce((code) => {
      this.res.code = code;
      return this;
    });
  send = jest
    .fn()
    .mockReturnThis()
    .mockImplementationOnce((message) => {
      this.res.message = message;
      return this;
    });
  json = jest
    .fn()
    .mockReturnThis()
    .mockImplementationOnce((json) => {
      this.res.json = json;
      return this;
    });
}

const mockUser: any = {
  cod: '1',
  username: 'anyid',
  password: 'anyid',
  email: 'test@example.it',
  dateofbirth: new Date('11/13/1981'),
  address: ['address #1'],
  githubusername: 'string',
};

const createUserDto: CreateUserDto = {
  cod: '1',
  username: 'anyid',
  password: 'anyid',
  email: 'test@example.it',
  dateofbirth: new Date('11/13/1981'),
  address: ['address #1'],
  githubusername: 'string',
};

const updateUserDto: UpdateUserDto = {
  cod: '2',
  username: 'anyid2',
  password: 'anyid2',
  email: 'test2@example.it',
  dateofbirth: new Date('11/11/1981'),
  address: ['address #2'],
  githubusername: 'string2',
};

describe('Users Controller', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  const paginationQueryDto: PaginationQueryDto = {
    limit: 10,
    offset: 1,
  };

  const response = new MockResponse();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(() => []),
            findAll: jest.fn(() => []),
            findOne: jest.fn(() => {}),
            update: jest.fn(() => {}),
            remove: jest.fn(() => {}),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('getAllUser()', () => {
    it('should call method findAll in UsersService', async () => {
      await usersController.getAllUsers(response, paginationQueryDto);
      expect(usersService.findAll).toHaveBeenCalled();
    });

    it('should return User on success', async () => {
      await usersController.getAllUsers(response, paginationQueryDto);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('getUser()', () => {
    it('should throw if UsersService findOne throws', async () => {
      jest
        .spyOn(usersService, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(
        usersController.getUser(response, '1'),
      ).rejects.toThrow(new NotFoundException());
    });
  });

  describe('addUser()', () => {
    it('should call method create in UsersService with correct values', async () => {
      const createSpy = jest.spyOn(usersService, 'createUser');
      await usersController.createUser(response, createUserDto);
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
    });

    it('should return a User on success', async () => {
      const createUserspy = jest.spyOn(usersService, 'createUser');
      await usersController.createUser(response, createUserDto);
      expect(createUserspy).toHaveBeenCalledWith(createUserDto);
    });
   });

  describe('updateUser()', () => {
    it('should call method update in usersService with correct values', async () => {
      const updateSpy = jest.spyOn(usersService, 'update');
      await usersController.updateUser(
        response,
        '2',
        updateUserDto,
      );
      expect(updateSpy).toHaveBeenCalledWith('2', updateUserDto);
    });
  });

  describe('deleteUser()', () => {
    it('should call methoed remove in usersService with correct value', async () => {
      const deleteSpy = jest.spyOn(usersService, 'remove');
      await usersController.deleteUser(response, '1');
      expect(deleteSpy).toHaveBeenCalledWith('1');
    });
  });
});
