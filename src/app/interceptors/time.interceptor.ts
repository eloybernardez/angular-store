import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs'; // tap operator to perform side effects

@Injectable()
export class TimeInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const start = performance.now();
    return next.handle(request).pipe(
      tap(() => {
        const time = performance.now() - start + 'ms';
        console.log(request.url, time);
      })
    );
  }
}
