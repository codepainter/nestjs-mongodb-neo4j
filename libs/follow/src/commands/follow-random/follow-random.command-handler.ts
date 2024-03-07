import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { FollowAggregateFactory } from '@app/follow/domains/follow.factory';
import {
  FOLLOW_AGGREGATE_FACTORY,
  FOLLOW_WRITE_REPOSITORY,
} from '@app/follow/follow.constants';
import { IFollowMongoWriteRepository } from '@app/follow/interfaces/follow.mongo-write-repository.interface';
import { CommandHandlerBase } from '@app/shared/cqrs/command-handler.base';
import { USER_SERVICE } from '@app/user';
import { IUserService } from '@app/user/interfaces/user.service.interface';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { FollowRandomCommand } from './follow-random.command';
import { CreateFollowResult } from './follow-random.result';

@CommandHandler(FollowRandomCommand)
export class FollowRandomCommandHandler extends CommandHandlerBase<
  FollowRandomCommand,
  CreateFollowResult
> {
  constructor(
    @InjectPinoLogger(FollowRandomCommandHandler.name)
    readonly logger: PinoLogger,
    @Inject(USER_SERVICE)
    readonly userService: IUserService,
    @Inject(FOLLOW_WRITE_REPOSITORY)
    readonly followWriteRepo: IFollowMongoWriteRepository,
    @Inject(FOLLOW_AGGREGATE_FACTORY) readonly factory: FollowAggregateFactory,
  ) {
    super(logger);
  }

  async handleCommand(): Promise<any> {
    const [user1, user2] = await this.userService.getRandomUser(2);

    const newFollow = this.factory.create({
      followerId: user1.id,
      followingId: user2.id,
    });
    this.logger.debug({ newFollow }, 'New Follow');

    await this.followWriteRepo.create(newFollow.props());

    return new CreateFollowResult(newFollow.props().id);
  }
}
