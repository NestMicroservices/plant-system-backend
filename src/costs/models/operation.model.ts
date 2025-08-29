import { Field, ObjectType } from '@nestjs/graphql';
import { CostConfig } from './cost-config.model';

@ObjectType()
export class Operation {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  plantId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [CostConfig], { nullable: true })
  costConfigs?: CostConfig[];
}
