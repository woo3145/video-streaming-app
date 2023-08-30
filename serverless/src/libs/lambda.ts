import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import eventNormalizerMiddleware from '@middy/event-normalizer';

export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser());
};

export const middyfyS3 = (handler) => {
  return middy().use(eventNormalizerMiddleware()).handler(handler);
};
