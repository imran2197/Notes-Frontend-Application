import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { HttpinterceptorService } from './services/httpinterceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideToastr({
      timeOut: 1000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpinterceptorService,
      multi: true,
    },
  ],
};
