import * as AWS from 'aws-sdk';
import { S3Event } from 'aws-lambda';
import { middyfyS3 } from '@libs/lambda';

const mediaconvert = new AWS.MediaConvert({
  endpoint: process.env.ENDPOINT_MEDIA_CONVERT,
});

const handler = async (event: S3Event) => {
  for (const record of event.Records) {
    const bucketName = record.s3.bucket.name;
    const objectKey = decodeURIComponent(
      record.s3.object.key.replace(/\+/g, ' ')
    );

    const inputLocation = `s3://${bucketName}/${objectKey}`;

    // const thumbnailOutputLocation = `s3://${bucketName}/thumbnails/`;
    // const videoOutputLocation = `s3://${bucketName}/encodedVideos/`;

    const params = {
      JobTemplate: 'encodingAndThumbnailTemplate', // 템플릿 설정으로만 관리
      Role: process.env.MEDIA_CONVERT_IAM_ROLE,
      Settings: {
        Inputs: [
          {
            FileInput: inputLocation,
          },
        ],
      },
    };

    try {
      let data = await mediaconvert.createJob(params).promise();

      console.log(`Job created! ID is ${data.Job.Id}`);
    } catch (error) {
      console.error(`Failed to start job for object "${objectKey}": ${error}`);
    }
    return {};
  }
};

export const encodingAndThumbail = middyfyS3(handler);
