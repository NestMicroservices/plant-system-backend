/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsPositive } from 'class-validator';

@InputType()
export class CreateCostConfigInput {
  @Field(() => Int)
  @IsPositive()
  operationId: number;

  @Field(() => Int)
  @IsPositive()
  volume: number;

  @Field(() => Float)
  @IsNumber()
  cost: number;
}
