import { Injectable } from '@nestjs/common';
import { deleteFileHelper } from './helper/delete-file';
import { uploadFileHelper } from './helper/upload-file';

@Injectable()
export class AppService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    return await uploadFileHelper(file);
  }

  async deleteFile(key: string) {
    try {
      const deleteObject = await deleteFileHelper(key);
      console.log(deleteObject);
    } catch (err) {
      console.log(err);
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
