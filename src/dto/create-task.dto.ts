import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
