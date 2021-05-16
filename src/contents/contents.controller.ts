import { Controller, Get, Param } from '@nestjs/common'

@Controller('contents')
export class ContentsController {
  @Get(':id')
  getAll(@Param('id') contentsId: string): string {
    return `contents id : ${contentsId}`
  }
}
