/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
