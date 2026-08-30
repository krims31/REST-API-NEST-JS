import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class CreateTaskIdDto {
  @IsNumber()
  @IsString()
  id: number | string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  status: boolean;

  @IsDate()
  createdAt: Date;
}
