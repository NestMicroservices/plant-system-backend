import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { OperationRepository } from 'src/data/repositories/operation.repository';
import { Operation } from './models/operation.model';

@Resolver(() => Operation)
export class OperationResolver {
  constructor(private readonly operationRepository: OperationRepository) {}

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
    return entity ? { ...entity } : null;
  }
}
