export class CostConfigEntity {
  id: number;
  operationId: number;
  volume: number;
  cost: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<CostConfigEntity>) {
    Object.assign(this, partial);
  }
}
