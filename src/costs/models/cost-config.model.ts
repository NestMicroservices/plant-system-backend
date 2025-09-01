import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Represents the cost configuration for an operation.',
})
export class CostConfig {
  @Field({ description: 'Unique identifier for the cost configuration.' })
  id: number;

  @Field({ description: 'Identifier of the associated operation.' })
  operationId: number;

  @Field({ description: 'Volume associated with this cost configuration.' })
  volume: number;

  @Field({ description: 'Cost value for this configuration.' })
  cost: number;

  @Field({ description: 'Date when this configuration was created.' })
  createdAt: Date;

  @Field({ description: 'Date when this configuration was last updated.' })
  updatedAt: Date;
}
