import { Field, ObjectType } from '@nestjs/graphql';

import { Operation } from './operation.model';

@ObjectType()
export class Plant {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Operation], { nullable: true })
  operations?: Operation[];
}
