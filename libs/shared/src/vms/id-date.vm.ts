import { Expose, Transform } from 'class-transformer';

import { DateUtil } from '../utils/date.util';
import { IdVM } from './id.vm';

type IdDateVMProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export class IdDateVM extends IdVM {
  @Expose({ name: 'created_at' })
  @Transform(({ value }) => DateUtil.toEpoch(value))
  readonly createdAt: Date;

  @Expose({ name: 'updated_at' })
  @Transform(({ value }) => DateUtil.toEpoch(value))
  readonly updatedAt: Date;

  @Expose({ name: 'deleted_at' })
  @Transform(({ value }) => (value ? DateUtil.toEpoch(value) : null))
  readonly deletedAt: Date | null;

  constructor(props: IdDateVMProps) {
    super(props.id);
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
