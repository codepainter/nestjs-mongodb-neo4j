import { ValidationError } from 'class-validator';

import { ClassValidatorException } from './class-validator.exception';

export function ClassValidatorExceptionFactory(errors: ValidationError[]) {
  console.log(errors);
  return new ClassValidatorException(
    errors.map((error) => Object.values(error.constraints)).flat(),
  );
}
