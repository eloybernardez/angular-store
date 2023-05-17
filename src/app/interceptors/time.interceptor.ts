import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs'; // tap operator to perform side effects

// Make an interceptor run only in certain requests
const CHECK_TIME = new HttpContextToken<boolean>(() => false);
export function checkTime() {
  return new HttpContext().set(CHECK_TIME, true);
}
@Injectable()
export class TimeInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TIME)) {
      const start = performance.now();
      return next.handle(request).pipe(
        tap(() => {
          const time = performance.now() - start + 'ms';
          console.log(request.url, time);
        })
      );
    }
    return next.handle(request);
  }
}
