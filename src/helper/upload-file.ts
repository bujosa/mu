/* eslint-disable prettier/prettier */
import { v4 as uuid } from 'uuid';
import { S3, Endpoint } from 'aws-sdk';

export const uploadFileHelper = async (
  file: Express.Multer.File,
): Promise<string> => {
  const spacesEndpoint = new Endpoint(process.env.SPACE_ENDPOINT);
  const s3 = new S3({ endpoint: spacesEndpoint });
  const fileName = `${Date.now()}-${uuid()}.${file.originalname
    .split('.')
    .pop()}`;

  const upload = await s3
    .upload(
      {
        Bucket: process.env.BUCKET_NAME,
        Body: file.buffer,
        Key: fileName,
        ACL: 'public-read',
      },
      (err) => {
        if (err) {
        }
      },
    )
    .promise();
  return upload.Location;
};
