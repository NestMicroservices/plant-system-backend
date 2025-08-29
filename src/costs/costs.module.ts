import { Module } from '@nestjs/common';
import { CostsResolver } from './costs.resolver';
import { DataModule } from 'src/data/data.module';

@Module({
  imports: [DataModule],
  providers: [CostsResolver],
})
export class CostsModule {}
