/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsPositive } from 'class-validator';

@InputType()
export class UpdateCostConfigInput {
  @Field(() => Int)
  @IsPositive()
  id: number;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  volume?: number;

  @Field(() => Float)
  @IsNumber()
  cost: number;
}
