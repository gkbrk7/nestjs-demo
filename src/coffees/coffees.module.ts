import { Injectable, Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import coffeesConfig from './config/coffees.config';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

//class MockCoffeesService { }
// class ConfigService { }
// class DevelopmentConfigService { }
// class ProductionConfigService { }

// @Injectable()
// export class CoffeeBrandsFactory {
//     create() {
//         return ['buddy brew', 'nescafe'];
//     }
// }

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    // ConfigModule, // loads .env file in the root directory
    ConfigModule.forFeature(coffeesConfig), // Partial config registration
  ],
  controllers: [CoffeesController],
  // When request CoffeesService then inject MockCoffeesService
  // providers: [{
  //     provide: CoffeesService,
  //     useValue: new MockCoffeesService()
  // }],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useValue: ['buddy brew', 'nescafe'],
      scope: Scope.DEFAULT,
    },
    // {
    //     provide: COFFEE_BRANDS,
    //     useFactory: async (connection: Connection): Promise<string[]> => {
    //         // const coffeeBrands = await connection.query('SELECT * ...');
    //         const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
    //         return coffeeBrands;
    //     },
    //     inject: [Connection]
    // },
    // { provide: COFFEE_BRANDS, useFactory: () => ['buddy brew', 'nescafe'] },
    // {
    //     provide: COFFEE_BRANDS,
    //     useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create(),
    //     inject: [CoffeeBrandsFactory]
    // },
    // {
    //     provide: ConfigService,
    //     useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService
    // }
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
