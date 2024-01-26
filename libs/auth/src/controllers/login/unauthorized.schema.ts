import { ApiResponseOptions } from '@nestjs/swagger';

export const apiUnauthorizedResponse: ApiResponseOptions = {
  description: 'Unauthorized',
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
        },
      },
      examples: {
        'AUTH.WRONG_CREDENTIAL': {
          summary: 'Wrong credential',
          value: {
            code: 'AUTH.WRONG_CREDENTIAL',
            message: 'Wrong Credential',
          },
        },
      },
    },
  },
};
