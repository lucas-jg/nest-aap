import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Complete separation of controller and business code
 * 컨트롤러는 단지 URL을 설정하는 부분
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello')
  getHi(): string {
    return this.appService.getHi();
  }
}
