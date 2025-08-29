import { ConflictException, Injectable } from '@nestjs/common';

import { CostConfigEntity } from '../entities/costConfig.entity';
import { PrismaService } from '../prisma.service';
import { Prisma } from 'generated/prisma';

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
    try {
      const data = {
        operationId: entity.operationId,
        volume: entity.volume,
        cost: entity.cost,
      };
      const result = await this.prisma.costConfig.create({ data });
      return new CostConfigEntity(result);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async update(
    id: number,
    entity: Partial<CostConfigEntity>,
  ): Promise<CostConfigEntity> {
    const result = await this.prisma.costConfig.update({
      where: { id },
      data: entity,
    });
    return new CostConfigEntity(result);
  }

  async delete(id: number): Promise<boolean> {
    try {
      const cost = await this.prisma.costConfig.delete({ where: { id } });
      return cost ? true : false;
    } catch {
      return false;
    }
  }

  private handleError(error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException(
        'A CostConfig with this volume already exists for the specified operation.',
      );
    }
  }
}
