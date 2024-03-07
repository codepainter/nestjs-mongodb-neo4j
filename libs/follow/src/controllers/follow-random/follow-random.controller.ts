import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { FollowRandomCommand } from '@app/follow/commands/follow-random/follow-random.command';
import { Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller()
export class FollowRandomController {
  constructor(
    @InjectPinoLogger(FollowRandomController.name)
    private readonly logger: PinoLogger,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('follow.random')
  async followRandom() {
    this.logger.trace('followRandom()');

    const command = new FollowRandomCommand({});

    return this.commandBus.execute(command);
  }
}
