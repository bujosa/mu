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
  constructor(private readonly service: AppService) {}

  @Post('file')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fileSize: 3000000,
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.service.uploadFile(file);
  }

  @Delete('file')
  async deleteFile(@Body() picture: Picture) {
    return this.service.deleteFile(picture);
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
    return this.service.uploadFiles(files);
  }
}
