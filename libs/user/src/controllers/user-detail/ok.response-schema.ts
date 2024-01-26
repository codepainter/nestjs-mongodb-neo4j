import { ApiResponseOptions } from '@nestjs/swagger';

export const apiOkResponseSchema: ApiResponseOptions = {
  description: 'The user was found',
  schema: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        example: 'USER.DETAILS',
      },
      message: {
        type: 'string',
        example: 'User details',
      },
      data: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'd63bbb97-a34f-44ac-a96b-fbd4f86028d7',
          },
          firstName: {
            type: 'string',
            example: 'Hector',
          },
          lastName: {
            type: 'string',
            example: 'Blick',
          },
          bio: {
            type: 'string',
            example:
              'Quia accusantium voluptas dolorum soluta. Eius tenetur possimus cumque aut. Natus voluptas vero debitis non voluptates omnis. Sint quasi reiciendis consectetur qui omnis dolore nulla est.',
          },
        },
      },
    },
  },
};
