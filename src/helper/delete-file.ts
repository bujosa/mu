import { Endpoint, S3 } from 'aws-sdk';

export const deleteFileHelper = async (url: string) => {
  console.log(url);
  const key = url.split(`${process.env.SPACE_ENDPOINT}\\`).pop();
  console.log(key);
  const spacesEndpoint = new Endpoint(process.env.SPACE_ENDPOINT);
  const s3 = new S3({ endpoint: spacesEndpoint });
  return await s3
    .deleteObject({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    })
    .promise();
};
