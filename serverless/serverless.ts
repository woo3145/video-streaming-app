import type { AWS } from '@serverless/typescript';

import generateThumbnail from '@functions/generateThumbnail';

const serverlessConfiguration: AWS = {
  service: 'woo3145-serverless',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: {
    // thumbnail 생성과 encode 한번에 할 예정(MediaConvert가 jpg만 따로 캡쳐할 수 없고 output에 비디오가 최소 하나 존재해야함)
    generateThumbnail,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
