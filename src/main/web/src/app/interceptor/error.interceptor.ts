import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {NotificationComponent} from "../notification/notification.component";
import {NotificationData} from "../notification/notification-data";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        const data = new NotificationData();
        data.message = err.error['message'];
        data.success = false;

        return this.dialog.open(NotificationComponent, {
          width: '600px',
          data: data
        }).afterClosed().pipe(() => next.handle(request));
      })
    );
  }
}
