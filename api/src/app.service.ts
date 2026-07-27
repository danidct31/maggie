import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: 'maggie-api',
      timestamp: new Date().toISOString(),
    };
  }
}
