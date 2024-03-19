import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const BearerToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization.split(' ');
    if (type == 'Bearer') return token;
  },
);
