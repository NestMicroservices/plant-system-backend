import { Module } from '@nestjs/common';

import { DataModule } from 'src/data/data.module';
import { OperationResolver } from './operation.resolver';
import { PlantResolver } from './plant.resolver';

@Module({
  imports: [DataModule],
  providers: [PlantResolver, OperationResolver],
})
export class CostsModule {}
