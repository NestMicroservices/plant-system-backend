import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { CostConfigRepository } from '../data/repositories/cost-config.repository';
import { PlantRepository } from '../data/repositories/plant.repository';
import { CostConfig } from './models/cost-config.model';
import { Plant } from './models/plant.model';

@Resolver()
export class CostsResolver {
  constructor(
    private readonly plantRepository: PlantRepository,
    private readonly costConfigRepository: CostConfigRepository,
  ) {}

  @Query(() => [Plant])
  async plants(): Promise<Plant[]> {
    const entities = await this.plantRepository.findAll();
    return entities.map((e) => ({ ...e }));
  }

  @Query(() => Plant, { nullable: true })
  async plantById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Plant | null> {
    const entity = await this.plantRepository.findById(id);
    return entity ? { ...entity } : null;
  }

  @Query(() => [CostConfig])
  async costConfigs(): Promise<CostConfig[]> {
    const entities = await this.costConfigRepository.findAll();
    return entities.map((e) => ({ ...e }));
  }
}
