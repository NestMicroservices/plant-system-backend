import { Query, Resolver } from '@nestjs/graphql';

import { CostConfigRepository } from '../data/repositories/cost-config.repository';
import { CostConfig } from './models/cost-config.model';

@Resolver(() => CostConfig)
export class CostConfigResolver {
  constructor(private readonly costConfigRepository: CostConfigRepository) {}

  @Query(() => [CostConfig])
  async costConfigs(): Promise<CostConfig[]> {
    const entities = await this.costConfigRepository.findAll();
    return entities.map((e) => ({ ...e }));
  }
}
