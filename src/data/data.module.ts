import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { PlantRepository } from './repository/plant.repository';
import { CostConfigRepository } from './repository/cost-config.repository';
import { OperationRepository } from './repository/operation.repository';

@Module({
  providers: [
    PrismaService,
    PlantRepository,
    CostConfigRepository,
    OperationRepository,
  ],
})
export class DataModule {}
