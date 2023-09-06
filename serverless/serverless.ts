import type { AWS } from '@serverless/typescript';

import encodingAndThumbail from '@functions/encodingAndThumbail';

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
      ENDPOINT_MEDIA_CONVERT: '${param:ENDPOINT_MEDIA_CONVERT}',
      MEDIA_CONVERT_IAM_ROLE: '${param:MEDIA_CONVERT_IAM_ROLE}',
      // 초기 배포는 [ ENDPOINT_MEDIA_CONVERT, MEDIA_CONVERT_IAM_ROLE ] 주석처리 후 $ serverless deploy 실행
      // 배포시 아래 명령어로 환경변수 추가
      // serverless deploy --param="ENDPOINT_MEDIA_CONVERT=환경변수" --param="MEDIA_CONVERT_IAM_ROLE=환경변수"
    },
  },
  // import the function via paths
  functions: {
    encodingAndThumbail,
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
