import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // apply for every routes
    // consumer.apply(LoggingMiddleware).forRoutes({path: 'coffees', method: RequestMethod.GET}); // apply for coffees GET methods
    // consumer.apply(LoggingMiddleware).forRoutes('coffees'); // apply for coffees routes
    // consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*'); // except from coffees apply for all routes
  }
}
