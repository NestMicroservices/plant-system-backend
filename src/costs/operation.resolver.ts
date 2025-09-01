import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { OperationRepository } from 'src/data/repositories/operation.repository';
import { Operation } from './models/operation.model';
import { CreateOperationInput } from './dtos/inputs/create-operation.input';
import { OperationEntity } from 'src/data/entities/operation.entity';
import { UpdateOperationInput } from './dtos/inputs/update-operation.input';
import { MutationResponse } from './dtos/mutation-response';

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

  @Mutation(() => Operation)
  async updateOperation(
    @Args('updateOperationInput')
    updateOperationInput: UpdateOperationInput,
  ): Promise<Operation> {
    const { id, ...rest } = updateOperationInput;
    const entitie = await this.operationRepository.update(
      id,
      new OperationEntity(rest),
    );

    return entitie;
  }

  @Mutation(() => MutationResponse)
  async deleteOperation(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<MutationResponse> {
    const isSuccess = await this.operationRepository.delete(id);

    const response = new MutationResponse();
    response.success = isSuccess;
    return response;
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
