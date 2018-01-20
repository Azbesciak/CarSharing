import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {ToastService} from "../ui/toast/toast.service";

@Injectable()
export class ResponseObserver implements HttpInterceptor {

  constructor(private toast: ToastService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.info('req.headers =', req.headers, ';');
    return next.handle(req)
      .map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && ~(event.status / 100) > 3) {
          console.info('HttpResponse::event =', event, ';');
        } else console.info('event =', event, ';');
        return event;
      })
      .catch((err: any, caught) => {
        if (err.error.message) {
          this.toast.show(err.error.message)
        }
        return Observable.throw(err);
      });
  }
}
