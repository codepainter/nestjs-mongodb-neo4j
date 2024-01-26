import { UserAggregate, UserProps } from '@app/user/domains/user.aggregate';
import { UserVM } from '@app/user/vms/user.vm';
import { faker } from '@faker-js/faker';

export function UserAggregateDataStub(
  override?: Partial<UserProps>,
): UserProps {
  const data: UserProps = {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    bio: faker.lorem.paragraph(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    deletedAt: null,
  };
  return {
    ...data,
    ...override,
  };
}

export function UserAggregateStub(
  override?: Partial<UserProps>,
): UserAggregate {
  return new UserAggregate(UserAggregateDataStub(override));
}

export function UserVMStub(override?: Partial<UserProps>): UserVM {
  return new UserVM(UserAggregateDataStub(override));
}
