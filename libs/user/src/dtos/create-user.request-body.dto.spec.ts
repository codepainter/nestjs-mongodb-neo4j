import { validate } from 'class-validator';

import { CreateUserRequestBodyDto } from './create-user.request-body.dto';

describe('CreateUserRequestBodyDto', () => {
  it('should throw an error if the name is not a string', async () => {
    const dto = new CreateUserRequestBodyDto();
    // @ts-ignore
    dto.name = 123;

    const errors = await validate(dto);

    expect(errors.length).not.toEqual(0);
  });

  it("should throw an error if the name's length is less than 3", async () => {
    const dto = new CreateUserRequestBodyDto();
    dto.name = 'ab';

    const errors = await validate(dto);

    expect(errors.length).not.toEqual(0);
  });

  it("should throw an error if the name's length is greater than 100", async () => {
    const dto = new CreateUserRequestBodyDto();
    dto.name = 'a'.repeat(101);

    const errors = await validate(dto);

    expect(errors.length).not.toEqual(0);
  });

  it('should throw an error if the email is not a string', async () => {
    const dto = new CreateUserRequestBodyDto();
    // @ts-ignore
    dto.email = 123;

    const errors = await validate(dto);

    expect(errors.length).not.toEqual(0);
  });

  it('should throw an error if the email is not a valid email', async () => {
    const dto = new CreateUserRequestBodyDto();
    dto.email = 'abc';

    const errors = await validate(dto);

    expect(errors.length).not.toEqual(0);
  });
});
