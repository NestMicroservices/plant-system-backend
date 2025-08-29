import { Field, ObjectType } from '@nestjs/graphql';
import { CostConfig } from './cost-config.model';

@ObjectType({ description: 'Represents an operation within a plant.' })
export class Operation {
  @Field({ description: 'Unique identifier for the operation.' })
  id: number;

  @Field({ description: 'Name of the operation.' })
  name: string;

  @Field({ description: 'Identifier of the associated plant.' })
  plantId: number;

  @Field({ description: 'Date when this operation was created.' })
  createdAt: Date;

  @Field({ description: 'Date when this operation was last updated.' })
  updatedAt: Date;

  @Field(() => [CostConfig], {
    nullable: true,
    description: 'List of cost configurations for this operation.',
  })
  costConfigs?: CostConfig[];
}
