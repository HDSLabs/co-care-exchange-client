import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../core/services/cce/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../core/services/user.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private toastrService: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        const error = err.error.message || err.statusText;
        if (err.status === 0) {
          this.toastrService.error('ColoradoCareExchange services are not responding.  Please try again later.', null, {
            enableHtml: true,
            positionClass: 'toast-top-center',
          });
        } else if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.userService.logout();
          location.reload(true);
        } else if (err.status === 500 && err.error.message === 'Invalid JWT token') {
          this.userService.logout();
          location.reload(true);
        } else if (err.status === 400) {
          this.toastrService.error(err.error, null, {
            enableHtml: true,
            positionClass: 'toast-top-center',
          });
        }

        return throwError(error);
      })
    );
  }
}
