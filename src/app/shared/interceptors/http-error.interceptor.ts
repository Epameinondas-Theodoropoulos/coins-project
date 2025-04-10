import { Injectable, Injector } from '@angular/core';
import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../services/error-handling.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request?.headers?.get('skip')) {
      return next.handle(request);
    } else {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          const errorHandlingService = this.injector.get(ErrorHandlingService);
          errorHandlingService.showHttpResponseError(error);
          return throwError(() => error);
        })
      ) as Observable<HttpEvent<any>>;
    }
  }
}
