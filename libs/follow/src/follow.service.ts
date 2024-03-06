import { Injectable } from '@nestjs/common';

@Injectable()
export class FollowService {
  async getFollowerByUserId(): Promise<string[]> {
    // TODO: Implement this method
    return ['follower1', 'follower2'];
  }
}
