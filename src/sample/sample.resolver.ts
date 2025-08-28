import { Query, Resolver } from '@nestjs/graphql';
import { Book } from './models/book.model';

@Resolver()
export class SampleResolver {
  @Query(() => [Book])
  books() {
    return [
      {
        title: 'The Awakening',
        author: 'Kate Chopin',
      },
      {
        title: 'City of Glass',
        author: 'Paul Auster',
      },
    ];
  }
}
