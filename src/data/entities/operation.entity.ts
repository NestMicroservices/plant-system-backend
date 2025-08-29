export class OperationEntity {
  id: number;
  name: string;
  plantId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<OperationEntity>) {
    Object.assign(this, partial);
  }
}
