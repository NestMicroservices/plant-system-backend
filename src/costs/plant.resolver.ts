import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { PlantRepository } from '../data/repositories/plant.repository';
import { Plant } from './models/plant.model';

@Resolver(() => Plant)
export class PlantResolver {
  constructor(private readonly plantRepository: PlantRepository) {}

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
