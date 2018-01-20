import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import {Md2Toast} from "md2";

@Injectable()
export class AuthInterceptor implements  HttpInterceptor {

  constructor(private auth: AuthService, private toast: Md2Toast) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const clonedRequest = req.clone({ headers: this.auth.addToken(req) });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest).catch(err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 403) {
          this.toast.show("Authorization required", 5000)
        }
      }
      return Observable.throw(err);
    });
  }
}
