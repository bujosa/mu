import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Picture } from './dtos/picture';

@Controller('upload')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('file')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fileSize: 3000000,
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.uploadFile(file);
  }

  @Delete('file')
  async deleteFile(@Body() picture: Picture) {
    return this.appService.deleteFile(picture);
  }

  @Post('files')
  @UseInterceptors(
    FilesInterceptor('images', null, {
      limits: { fileSize: 3000000 },
    }),
  )
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<string[]> {
    return this.appService.uploadFiles(files);
  }
}
