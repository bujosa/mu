/* eslint-disable prettier/prettier */
import { S3 } from 'aws-sdk';

export const deleteFileHelper = async (key: string) => {
  const s3 = new S3();
  return await s3
    .deleteObject({
      Bucket: process.env.BUCKET_NAME,
      key: key,
    })
    .promise();
};
