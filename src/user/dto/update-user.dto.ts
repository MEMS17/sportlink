import { IsEmail, IsOptional, IsString, MinLength, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsEnum(['ADMIN', 'MEMBER'])
  role?: string;
}