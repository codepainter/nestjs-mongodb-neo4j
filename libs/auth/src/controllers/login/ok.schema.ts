import { ApiResponseOptions } from '@nestjs/swagger';

export const apiOkResponseSchema: ApiResponseOptions = {
  description: 'OK',
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
          data: {
            type: 'object',
            properties: {
              access_token: {
                type: 'string',
              },
              refresh_token: {
                type: 'string',
              },
            },
          },
        },
      },
      examples: {
        'AUTH.LOGIN_SUCCESS': {
          summary: 'Login success',
          value: {
            code: 'AUTH.LOGIN_SUCCESS',
            message: 'Login Success',
            data: {
              access_token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwiaWF0IjoxNjgzMzkxODMyLCJleHAiOjE2ODMzOTE4OTIsInN1YiI6IjU2OTQ0MzcwLWM4Y2QtNDNhZC05MTJkLTYwNjk4NDU3YTNjMiJ9.XzZaL703Xg9OlS8PeV520LJH1CsthAW8hLTouEviiLk',
              refresh_token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiUkVGUkVTSF9UT0tFTiIsImlhdCI6MTY4MzM5MTgzMiwiZXhwIjoxNjgzNDc4MjMyLCJzdWIiOiI1Njk0NDM3MC1jOGNkLTQzYWQtOTEyZC02MDY5ODQ1N2EzYzIifQ.Goc64SiNOhqkOCjMhInrnz6F30VeM_vlyDpZTi1mqas',
            },
          },
        },
      },
    },
  },
};
