/* eslint-disable prettier/prettier */
import { v4 as uuid } from 'uuid';
import { S3 } from 'aws-sdk';

export const uploadFileHelper = async (file: Express.Multer.File) => {
  const s3 = new S3();
  const fileName = `${Date.now()}-${uuid()}.${file.originalname
    .split('.')
    .pop()}`;

  return await s3
    .upload({
      Bucket: process.env.BUCKET_NAME,
      Body: file.buffer,
      key: fileName,
    })
    .promise();
};
