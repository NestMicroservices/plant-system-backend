import { Field, ObjectType } from '@nestjs/graphql';

import { Operation } from './operation.model';

@ObjectType({ description: 'Represents a plant entity.' })
export class Plant {
  @Field({ description: 'Unique identifier for the plant.' })
  id: number;

  @Field({ description: 'Name of the plant.' })
  name: string;

  @Field({ description: 'Date when this plant was created.' })
  createdAt: Date;

  @Field({ description: 'Date when this plant was last updated.' })
  updatedAt: Date;

  @Field(() => [Operation], {
    nullable: true,
    description: 'List of operations associated with this plant.',
  })
  operations?: Operation[];
}
