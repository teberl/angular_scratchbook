import { bootstrapApplication } from '@angular/platform-browser';
import {
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
  withInterceptors,
} from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { tap } from 'rxjs';

function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  console.log('Outgoing Request:', req);

  // const clonedReq = req.clone({
  //   headers: req.headers.set('X-Custom-Header', 'MyHeaderValue'),
  // });

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          console.log('Incoming Response:', event);
        }
      },
    })
  );
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
}).catch((err) => console.error(err));
