import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CostConfigRepository } from '../data/repositories/cost-config.repository';
import { CostConfig } from './models/cost-config.model';
import { CostConfigEntity } from 'src/data/entities/costConfig.entity';
import { MutationResponse } from './dtos/mutation-response';
import { CreateCostConfigInput } from './dtos/inputs/create-costconfig.input';
import { UpdateCostConfigInput } from './dtos/inputs/update-costconfig.input';

@Resolver(() => CostConfig)
export class CostConfigResolver {
  constructor(private readonly costConfigRepository: CostConfigRepository) {}

  @Mutation(() => CostConfig)
  async createCostConfig(
    @Args('createCostConfigInput')
    createCostConfigInput: CreateCostConfigInput,
  ): Promise<CostConfig> {
    const entitie = await this.costConfigRepository.create(
      new CostConfigEntity(createCostConfigInput),
    );
    return entitie;
  }

  @Mutation(() => CostConfig)
  async updateCostConfig(
    @Args('updateCostConfigInput')
    updateCostConfigInput: UpdateCostConfigInput,
  ): Promise<CostConfig> {
    const { id, ...rest } = updateCostConfigInput;
    const entitie = await this.costConfigRepository.update(
      id,
      new CostConfigEntity(rest),
    );

    return entitie;
  }

  @Mutation(() => MutationResponse)
  async deleteCostConfig(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<MutationResponse> {
    const isSuccess = await this.costConfigRepository.delete(id);

    const response = new MutationResponse();
    response.success = isSuccess;
    return response;
  }

  @Query(() => [CostConfig])
  async costConfigs(): Promise<CostConfig[]> {
    const entities = await this.costConfigRepository.findAll();
    return entities.map((e) => ({ ...e }));
  }
}
