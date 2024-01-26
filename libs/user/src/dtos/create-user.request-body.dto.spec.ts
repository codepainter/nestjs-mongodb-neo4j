import { validate } from 'class-validator';

import { CreateUserRequestBodyDto } from './create-user.request-body.dto';

describe('CreateUserRequestBodyDto', () => {
  it('should throw an error if the first name is not a string', async () => {
    const dto = new CreateUserRequestBodyDto();
    // @ts-ignore
    dto.firstName = 123;

    const errors = await validate(dto);

    expect(errors.length).not.toEqual(0);
  });

  it('should throw an error if the first name is less than 3 characters', async () => {
    const dto = new CreateUserRequestBodyDto();
    dto.firstName = 'ab';

    const errors = await validate(dto);

    expect(errors.length).not.toEqual(0);
  });

  it('should throw an error if the first name is more than 100 characters', async () => {
    const dto = new CreateUserRequestBodyDto();
    dto.firstName = 'a'.repeat(101);

    const errors = await validate(dto);

    expect(errors.length).not.toEqual(0);
  });

  it('should throw an error if the last name is not a string', async () => {
    const dto = new CreateUserRequestBodyDto();
    // @ts-ignore
    dto.lastName = 123;

    const errors = await validate(dto);

    expect(errors.length).not.toEqual(0);
  });

  it('should throw an error if the last name is less than 3 characters', async () => {
    const dto = new CreateUserRequestBodyDto();
    dto.lastName = 'ab';

    const errors = await validate(dto);

    expect(errors.length).not.toEqual(0);
  });

  it('should throw an error if the last name is more than 100 characters', async () => {
    const dto = new CreateUserRequestBodyDto();
    dto.lastName = 'a'.repeat(101);

    const errors = await validate(dto);

    expect(errors.length).not.toEqual(0);
  });

  it('should throw an error if the bio is not a string', async () => {
    const dto = new CreateUserRequestBodyDto();
    // @ts-ignore
    dto.bio = 123;

    const errors = await validate(dto);

    expect(errors.length).not.toEqual(0);
  });

  it('should throw an error if the bio is less than 3 characters', async () => {
    const dto = new CreateUserRequestBodyDto();
    dto.bio = 'ab';

    const errors = await validate(dto);

    expect(errors.length).not.toEqual(0);
  });

  it('should throw an error if the bio is more than 255 characters', async () => {
    const dto = new CreateUserRequestBodyDto();
    dto.bio = 'a'.repeat(256);

    const errors = await validate(dto);

    expect(errors.length).not.toEqual(0);
  });
});
