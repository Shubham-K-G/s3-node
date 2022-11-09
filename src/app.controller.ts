import { Controller, Delete, Get, Post, Query, Req, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/buckets')
  listBuckets() {
    return this.appService.listBuckets();
  }
  @Get('/file')
  async getFile(@Req() req: Request, @Res() res: Response, @Query('download') download: string, @Query('fileName') fileName: string) {
    const data = await this.appService.getFile(fileName);
    if( download && download.toLowerCase() === 'true') {
      res.set({
        'Content-Disposition': `attachment; filename=${fileName}`,
      });
    }
    return data.pipe(res);
  }

  @Get('/files')
  listFiles() {
    return this.appService.listFiles();
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
