export class PlantEntity {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<PlantEntity>) {
    Object.assign(this, partial);
  }
}
