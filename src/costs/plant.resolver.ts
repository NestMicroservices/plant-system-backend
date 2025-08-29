import {
  Args,
  Int,
  Parent,
  Query,
  Resolver,
  ResolveField,
} from '@nestjs/graphql';

import { CostConfigRepository } from '../data/repositories/cost-config.repository';
import { PlantRepository } from '../data/repositories/plant.repository';
import { CostConfig } from './models/cost-config.model';
import { Plant } from './models/plant.model';

@Resolver(() => Plant)
export class PlantResolver {
  constructor(
    private readonly plantRepository: PlantRepository,
    private readonly costConfigRepository: CostConfigRepository,
  ) {}

  @Query(() => [Plant])
  async plants() {
    const entities = await this.plantRepository.findAll();
    return entities.map((e) => ({ ...e }));
  }

  @Query(() => Plant, { nullable: true })
  async plantById(@Args('id', { type: () => Int }) id: number) {
    const entity = await this.plantRepository.findById(id);
    return entity ?? null;
  }

  @Query(() => [CostConfig])
  async costConfigs(): Promise<CostConfig[]> {
    const entities = await this.costConfigRepository.findAll();
    return entities.map((e) => ({ ...e }));
  }

  @ResolveField(() => [Number], {
    nullable: true,
    description: 'Unique sorted volumes from all cost configs of the plant.',
  })
  volumes(@Parent() plant: Plant): number[] {
    if (!plant.operations) return [];
    return Array.from(
      new Set(
        plant.operations
          .flatMap((op) => op.costConfigs ?? [])
          .map((cfg) => cfg.volume),
      ),
    ).sort((a, b) => a - b);
  }
}
