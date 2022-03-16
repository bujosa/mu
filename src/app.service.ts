import { Injectable } from '@nestjs/common';
import { Picture } from './dtos/picture';
import { deleteFileHelper } from './helper/delete-file';
import { uploadFileHelper } from './helper/upload-file';

@Injectable()
export class AppService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    return uploadFileHelper(file);
  }

  async deleteFile(picture: Picture) {
    try {
      await deleteFileHelper(picture);
    } catch (err) {
      return false;
    }
    return true;
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    const urls = [];
    files.map(async (file: Express.Multer.File) => {
      urls.push(await uploadFileHelper(file));
    });
    return await urls;
  }
}
