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
    const outputLocation = `s3://${bucketName}/thumbnails/`;

    const params = {
      JobTemplate: 'thumbnails-template',
      Role: process.env.MEDIA_CONVERT_IAM_ROLE,
      Settings: {
        Inputs: [
          {
            FileInput: inputLocation,
          },
        ],
        OutputGroups: [
          {
            Name: 'File Group',
            Outputs: [
              {
                Extension: 'jpg',
                NameModifier: '_thumbnail',
              },
            ],
            OutputGroupSettings: {
              Type: 'FILE_GROUP_SETTINGS',
              FileGroupSettings: {
                Destination: `${outputLocation}`,
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

export const generateThumbnail = handler;
