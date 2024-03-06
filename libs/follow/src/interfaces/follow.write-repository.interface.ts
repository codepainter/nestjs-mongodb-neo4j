import { FollowProps } from '../domains/follow.aggregate';

export interface IFollowWriteRepository {
  create(props: FollowProps): Promise<void>;
}
