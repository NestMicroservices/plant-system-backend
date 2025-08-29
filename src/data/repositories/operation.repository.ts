import { Injectable } from '@nestjs/common';

import { OperationEntity } from '../entities/operation.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OperationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<OperationEntity[]> {
    const operations = await this.prisma.operation.findMany({
      include: { costConfigs: true },
    });
    return operations.map((op) => new OperationEntity(op));
  }

  async findById(id: number): Promise<OperationEntity | undefined> {
    const operation = await this.prisma.operation.findUnique({
      where: { id },
      include: { costConfigs: true },
    });
    return operation ? new OperationEntity(operation) : undefined;
  }

  async create(entity: OperationEntity): Promise<OperationEntity> {
    const data = {
      name: entity.name,
      plantId: entity.plantId,
    };
    const result = await this.prisma.operation.create({ data });
    return new OperationEntity(result);
  }

  async update(
    id: number,
    entity: Partial<OperationEntity>,
  ): Promise<OperationEntity | undefined> {
    const result = await this.prisma.operation.update({
      where: { id },
      data: entity,
    });
    return result ? new OperationEntity(result) : undefined;
  }

  async delete(id: number): Promise<boolean> {
    try {
      const operation = await this.prisma.operation.delete({ where: { id } });
      return operation ? true : false;
    } catch {
      return false;
    }
  }
}
