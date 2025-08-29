import { Injectable } from '@nestjs/common';

import { CostConfigEntity } from '../data/entities/costConfig.entity';
import { PlantEntity } from '../data/entities/plant.entity';
import { OperationEntity } from '../data/entities/operation.entity';
import { PlantRepository } from '../data/repositories/plant.repository';
import { OperationRepository } from '../data/repositories/operation.repository';
import { CostConfigRepository } from '../data/repositories/cost-config.repository';

@Injectable()
export class SeedService {
  constructor(
    private readonly plantRepository: PlantRepository,
    private readonly operationRepository: OperationRepository,
    private readonly costConfigRepository: CostConfigRepository,
  ) {}

  async run() {
    // Plants
    const plantNames = ['Peru', 'Brasil'];
    const operationNames = ['Impresion', 'Lamindo', 'Embolsado'];
    const volumes = [300, 500, 1000, 3000, 5000, 10000, 20000, 30000];
    const costs = [0.015, 0.015, 15.0, 10.0, 8.0, 7.0, 5.0, 4.8];

    // Create plants and operations
    const operations = await Promise.all(
      plantNames.flatMap(async (plantName) => {
        const plant = await this.plantRepository.create(
          new PlantEntity({ name: plantName }),
        );
        return Promise.all(
          operationNames.map(async (operationName) => {
            const operation = await this.operationRepository.create(
              new OperationEntity({ name: operationName, plantId: plant.id }),
            );
            return operation;
          }),
        );
      }),
    );

    // Create cost configurations
    const allOperations = operations.flat();
    const costConfigPromises = allOperations.flatMap((operation) =>
      volumes.map((volume, i) =>
        this.costConfigRepository.create(
          new CostConfigEntity({
            operationId: operation.id,
            volume,
            cost: costs[i],
          }),
        ),
      ),
    );
    await Promise.all(costConfigPromises);
  }
}
