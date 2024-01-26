import { ApiResponseOptions } from '@nestjs/swagger';

export const apiNotFoundResponseSchema: ApiResponseOptions = {
  description: 'Not Found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
          metadata: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
              },
            },
          },
        },
      },
      examples: {
        'USER.NOT_FOUND': {
          summary: 'User not found',
          value: {
            code: 'USER.NOT_FOUND',
            message: 'User Not Found',
            metadata: {
              email: 'Karine.Windler16@example.neta',
            },
          },
        },
      },
    },
  },
};
