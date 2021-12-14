import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
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

  @IsDate()
  @IsNotEmpty()
  readonly dateofbirth: Date;

  @IsString()
  @IsOptional()
  readonly cep: string;

  @IsString()
  @IsOptional()
  readonly uf: string;

  @IsString()
  @IsOptional()
  readonly localidade: string;

  @IsString()
  @IsOptional()
  readonly bairro: string;

  @IsString()
  @IsOptional()
  readonly logradouro: string;

  @IsString()
  @IsOptional()
  readonly numero: string;

  @IsString()
  @IsOptional()
  readonly complemento: string;

  @IsString()
  @IsOptional()
  readonly githubusername: string;
}
