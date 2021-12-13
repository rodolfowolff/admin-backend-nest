import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsDate,
  IsAlphanumeric,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1, {
    message: 'Id is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(10, {
    message: 'Id is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly cod: string;

  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3, {
    message: 'Id is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(80, {
    message: 'Id is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly username: string;

  // @IsNotEmpty()
  // @MinLength(4, {
  //     message: 'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
  // })
  // @MaxLength(20, {
  //   message: 'Password is too long. Maximal length is $constraint1 characters, but actual is $value',
  // })
  // readonly password: string;

  // @IsEmail()
  // @IsNotEmpty()
  // readonly email: string;

  // @IsDate()
  // @IsNotEmpty()
  // readonly dateofbirth: Date;

  @IsArray()
  readonly address: Array<string>;

  @IsString()
  readonly githubusername: string;
}
