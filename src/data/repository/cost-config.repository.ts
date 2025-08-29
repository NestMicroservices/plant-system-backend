import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CostConfigEntity } from 'src/data/entities/costConfig.entity';

@Injectable()
export class CostConfigRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CostConfigEntity[]> {
    const configs = await this.prisma.costConfig.findMany();
    return configs.map((config) => new CostConfigEntity(config));
  }

  async findById(id: number): Promise<CostConfigEntity | undefined> {
    const config = await this.prisma.costConfig.findUnique({ where: { id } });
    return config ? new CostConfigEntity(config) : undefined;
  }

  async create(entity: CostConfigEntity): Promise<CostConfigEntity> {
    const data = {
      operationId: entity.operationId,
      volume: entity.volume,
      cost: entity.cost,
    };
    const result = await this.prisma.costConfig.create({ data });
    return new CostConfigEntity(result);
  }

  async update(
    id: number,
    entity: Partial<CostConfigEntity>,
  ): Promise<CostConfigEntity | undefined> {
    const result = await this.prisma.costConfig.update({
      where: { id },
      data: entity,
    });
    return result ? new CostConfigEntity(result) : undefined;
  }

  async delete(id: number): Promise<boolean> {
    try {
      const cost = await this.prisma.costConfig.delete({ where: { id } });
      return cost ? true : false;
    } catch {
      return false;
    }
  }
}
