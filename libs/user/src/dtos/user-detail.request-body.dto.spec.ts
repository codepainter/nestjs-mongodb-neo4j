import { validate } from 'class-validator';

import { UserDetailsRequestBodyDto } from './user-detail.request-body.dto';

describe('UserDetailRequestBodyDto', () => {
  it('should throw an error if the id is not a string', async () => {
    const dto = new UserDetailsRequestBodyDto();
    // @ts-ignore
    dto.id = 123;

    const errors = await validate(dto);

    expect(errors.length).not.toEqual(0);
  });

  it('should throw an error if the id is not a UUID', async () => {
    const dto = new UserDetailsRequestBodyDto();
    dto.id = 'abc';

    const errors = await validate(dto);

    expect(errors.length).not.toEqual(0);
  });
});
