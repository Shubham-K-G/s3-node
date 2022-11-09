import { Controller, Delete, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  listBuckets() {
    return this.appService.listBuckets();
  }

  @Get('/files')
  listFiles() {
    return this.appService.getFiles();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.uploadFile(file);
  }

  @Delete('delete')
  deleteFile() {
    return this.appService.deleteFile();
  }
}
