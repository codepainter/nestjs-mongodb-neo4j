import { validate } from 'class-validator';

import { LoginRequestBodyDto } from './login.request-body.dto';

describe('LoginRequestBodyDto', () => {
  it('should throw an error if email is not a string', async () => {
    // Arrange
    const dto = new LoginRequestBodyDto();
    dto.email = 123 as any;

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).not.toEqual(0);
  });

  it('should throw an error if email is not an email', async () => {
    // Arrange
    const dto = new LoginRequestBodyDto();
    dto.email = 'not-an-email';

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).not.toEqual(0);
  });

  it('should throw an error if phone is not a string', async () => {
    // Arrange
    const dto = new LoginRequestBodyDto();
    dto.phone = 123 as any;

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).not.toEqual(0);
  });

  it('should throw an error if password is not a string', async () => {
    // Arrange
    const dto = new LoginRequestBodyDto();
    dto.password = 123 as any;

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).not.toEqual(0);
  });

  it('should not throw an error if email and phone is not provided', async () => {
    // Arrange
    const dto = new LoginRequestBodyDto();
    dto.password = 'password';

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toEqual(0);
  });
});
