import { Endpoint, S3 } from 'aws-sdk';
import { Picture } from 'src/dtos/picture';

export const deleteFileHelper = async (picture: Picture) => {
  const key = picture.url.split(`${process.env.SPACE_ENDPOINT}/`).pop();
  const spacesEndpoint = new Endpoint(process.env.SPACE_ENDPOINT);
  const s3 = new S3({ endpoint: spacesEndpoint });

  return await s3
    .deleteObject({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    })
    .promise();
};
