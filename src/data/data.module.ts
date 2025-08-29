import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { PlantRepository } from './repositories/plant.repository';
import { CostConfigRepository } from './repositories/cost-config.repository';
import { OperationRepository } from './repositories/operation.repository';

@Module({
  providers: [
    PrismaService,
    PlantRepository,
    CostConfigRepository,
    OperationRepository,
  ],
  exports: [PlantRepository, CostConfigRepository, OperationRepository],
})
export class DataModule {}
