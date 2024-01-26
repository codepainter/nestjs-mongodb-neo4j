import { ApiResponseOptions } from '@nestjs/swagger';

export const apiOkResponseSchema: ApiResponseOptions = {
  description: 'The user was created successfully',
  schema: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        example: 'USER.REGISTERED',
      },
      message: {
        type: 'string',
        example: 'User Registered',
      },
      data: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '01b9f7c4-d2fe-42f0-b4d0-aa5fcd88a29e',
          },
        },
      },
    },
  },
};
