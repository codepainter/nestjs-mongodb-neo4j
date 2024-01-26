import { ApiResponseOptions } from '@nestjs/swagger';

export const notFoundResponseSchema: ApiResponseOptions = {
  description: 'The user was not found',
  schema: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        example: 'USER.NOT_FOUND',
      },
      message: {
        type: 'string',
        example: 'User Not Found',
      },
      metadata: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'd63bbb97-a34f-44ac-a96b-fbd4f86028d8',
          },
        },
      },
    },
  },
};
