import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SampleModule } from './sample/sample.module';
import { ConfigModule } from '@nestjs/config';
import { CostsModule } from './costs/costs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      graphiql: true,
    }),
    SampleModule,
    CostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
