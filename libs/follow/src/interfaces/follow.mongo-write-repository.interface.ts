import { FollowProps } from '../domains/follow.aggregate';

export interface IFollowMongoWriteRepository {
  create(props: FollowProps): Promise<void>;
}
