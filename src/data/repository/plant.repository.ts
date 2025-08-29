import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PlantEntity } from 'src/data/entities/plant.entity';
import { maPlantToEntity } from '../mappers/entity-mappers';

@Injectable()
export class PlantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PlantEntity[]> {
    const plants = await this.prisma.plant.findMany({
      include: { operations: true },
    });
    return plants.map(maPlantToEntity);
  }

  async findById(id: number): Promise<PlantEntity | undefined> {
    const plant = await this.prisma.plant.findUnique({
      where: { id },
      include: { operations: { include: { costConfigs: true } } },
    });
    return plant ? maPlantToEntity(plant) : undefined;
  }

  async create(entity: PlantEntity): Promise<PlantEntity> {
    const data = { name: entity.name };
    const plant = await this.prisma.plant.create({ data });
    return maPlantToEntity(plant);
  }

  async update(
    id: number,
    entity: Partial<PlantEntity>,
  ): Promise<PlantEntity | undefined> {
    const plant = await this.prisma.plant.update({
      where: { id },
      data: entity,
    });
    return plant ? maPlantToEntity(plant) : undefined;
  }

  async delete(id: number): Promise<boolean> {
    try {
      const plant = await this.prisma.plant.delete({ where: { id } });
      return plant ? true : false;
    } catch {
      return false;
    }
  }
}
