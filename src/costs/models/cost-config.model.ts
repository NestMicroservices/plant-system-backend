import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CostConfig {
  @Field()
  id: number;

  @Field()
  operationId: number;

  @Field()
  volume: number;

  @Field()
  cost: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
