/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

@InputType()
export class UpdateCostConfigInput {
  @Field(() => Int)
  @IsPositive()
  id: number;

  @Field(() => Int, { nullable: true })
  @IsPositive()
  @IsOptional()
  volume?: number;

  @Field(() => Float)
  @IsNumber()
  cost: number;
}
