import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class AppService {
  getHello(): string {
    return 'hello';
  }
}
