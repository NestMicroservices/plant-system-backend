/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, IsString, Length } from 'class-validator';

@InputType()
export class CreateOperationInput {
  @Field(() => Int)
  @IsPositive()
  readonly plantId: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  readonly name: string;
}
