import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BaseSchema {
  @Prop({ index: true })
  id: string;

  @Prop({
    name: 'created_at',
  })
  createdAt: Date;

  @Prop({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Prop({
    name: 'deleted_at',
  })
  deletedAt: Date;
}
