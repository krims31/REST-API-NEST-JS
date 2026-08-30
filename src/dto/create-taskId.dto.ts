export class CreateTaskIdDto {
  id: number | string;
  title: string;
  description: string;
  status: boolean;
  createdAt: Date;
}
