import { Module } from '@nestjs/common';

import { DataModule } from 'src/data/data.module';
import { OperationResolver } from './operation.resolver';
import { PlantResolver } from './plant.resolver';
import { CostConfigResolver } from './cost-config.resolver';

@Module({
  imports: [DataModule],
  providers: [CostConfigResolver, OperationResolver, PlantResolver],
})
export class CostsModule {}
