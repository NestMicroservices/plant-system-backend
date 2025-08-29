import { CostConfigEntity } from './costConfig.entity';

export class OperationEntity {
  id: number;
  name: string;
  plantId: number;
  createdAt: Date;
  updatedAt: Date;

  costConfig?: CostConfigEntity[];

  constructor(partial: Partial<OperationEntity>) {
    Object.assign(this, partial);
  }
}
