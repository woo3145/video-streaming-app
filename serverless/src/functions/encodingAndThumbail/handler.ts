import * as AWS from 'aws-sdk';
import { Context } from 'aws-lambda';

const mediaconvert = new AWS.MediaConvert({
  endpoint: process.env.ENDPOINT_MEDIA_CONVERT,
});

const handler = async (event: any, context: Context) => {
  for (const record of event.Records) {
    const bucketName = record.s3.bucket.name;
    const objectKey = decodeURIComponent(
      record.s3.object.key.replace(/\+/g, ' ')
    );

    const inputLocation = `s3://${bucketName}/${objectKey}`;

    const thumbnailOutputLocation = `s3://${bucketName}/thumbnails/`;
    const videoOutputLocation = `s3://${bucketName}/encodedVideos/`;

    const params = {
      JobTemplate: 'encodingAndThumbnailTemplate',
      Role: process.env.MEDIA_CONVERT_IAM_ROLE,
      Settings: {
        Inputs: [
          {
            FileInput: inputLocation,
          },
        ],
        OutputGroups: [
          {
            Name: 'File Group - encodedVideos',
            Outputs: [
              {
                Extension: 'mp4',
              },
            ],
            OutputGroupSettings: {
              Type: 'FILE_GROUP_SETTINGS',
              FileGroupSettings: {
                Destination: `${videoOutputLocation}`,
              },
            },
          },
          {
            Name: 'File Group - thumbnail',
            Outputs: [
              {
                Extension: 'jpg',
              },
            ],
            OutputGroupSettings: {
              Type: 'FILE_GROUP_SETTINGS',
              FileGroupSettings: {
                Destination: `${thumbnailOutputLocation}`,
              },
            },
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
  }
};

export const encodingAndThumbail = handler;
