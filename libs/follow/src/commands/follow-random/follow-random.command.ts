import { CommandBase } from '@app/shared/cqrs/command.base';

export type FollowRandomCommandProps = Record<string, never>;

export class FollowRandomCommand extends CommandBase<FollowRandomCommandProps> {
  constructor(props: FollowRandomCommandProps) {
    super(props);
  }
}
