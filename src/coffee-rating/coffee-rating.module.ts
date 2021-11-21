import { Module } from '@nestjs/common';
import { CoffeesModule } from '../coffees/coffees.module';
import { CoffeeRatingService } from './coffee-rating.service';

// @Module({
//   imports: [DatabaseModule.register({
//     type: 'postgres',
//     host: 'localhost',
//     password: 'pass123',
//     port: 5432
//   }), CoffeesModule],
//   providers: [CoffeeRatingService]
// })

@Module({
  imports: [CoffeesModule],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}