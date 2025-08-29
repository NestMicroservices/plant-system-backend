import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { OperationRepository } from 'src/data/repositories/operation.repository';
import { Operation } from './models/operation.model';
import { CreateOperationInput } from './dtos/inputs/create-operation.input';
import { OperationEntity } from 'src/data/entities/operation.entity';

@Resolver(() => Operation)
export class OperationResolver {
  constructor(private readonly operationRepository: OperationRepository) {}

  @Mutation(() => Operation)
  async createOperation(
    @Args('createOperationInput')
    createOperationInput: CreateOperationInput,
  ): Promise<Operation> {
    const entitie = await this.operationRepository.create(
      new OperationEntity(createOperationInput),
    );
    return entitie;
  }

  @Query(() => [Operation])
  async operations(): Promise<Operation[]> {
    const entities = await this.operationRepository.findAll();
    return entities.map((e) => ({ ...e }));
  }

  @Query(() => Operation, { nullable: true })
  async operationById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Operation | null> {
    const entity = await this.operationRepository.findById(id);
    return entity ?? null;
  }
}
