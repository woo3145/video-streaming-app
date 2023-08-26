import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.encodingAndThumbail`,
  events: [
    {
      s3: {
        bucket: 'woo3145-video-streaming-app',
        event: 's3:ObjectCreated:*',
        rules: [{ prefix: 'videos/' }],
      },
    },
  ],
};
