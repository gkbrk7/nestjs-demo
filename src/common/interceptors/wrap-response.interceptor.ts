import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before...");
    // return next.handle().pipe(tap(data => console.log('After...', data))); // console log operation called after handler execution completed
    return next.handle().pipe(map(data => ({ data }))); // wrap result with data property
  }
}
