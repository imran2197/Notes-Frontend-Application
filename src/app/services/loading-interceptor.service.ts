import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptorService implements HttpInterceptor {
  requests: HttpRequest<any>[] = [];

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.authService.setLoader(true);
    console.log('Loading Interceptor');
    return Observable.create(
      (observer: {
        next: (arg0: HttpResponse<any>) => void;
        error: (arg0: any) => void;
        complete: () => void;
      }) => {
        const subscription = next.handle(req).subscribe(
          (event) => {
            if (event instanceof HttpResponse) {
              observer.next(event);
            }
          },
          (err) => {
            this.showErrorMessage(err);
            observer.error(err);
          },
          () => {
            observer.complete();
          }
        );
        return () => {
          this.removeRequest(req);
          subscription.unsubscribe();
        };
      }
    );
  }

  removeRequest(req: HttpRequest<any>) {
    const index = this.requests.indexOf(req);
    if (index >= 0) {
      this.requests.splice(index, 1);
    }
    if (this.requests.length === 0) {
      this.authService.setLoader(false);
    }
  }

  showErrorMessage(error: { error: any }) {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = `Error Code: ${error.error.status}, Message: ${error.error.message}`;
    }
  }
}
