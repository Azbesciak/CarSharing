import { Injectable } from '@angular/core';
import {HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {SessionStorage} from "ngx-webstorage";

@Injectable()
export class AuthService {
  private static TOKEN_NAME = "Authorization";

  @SessionStorage()
  private tokenValue?: string;

  addToken(req: HttpRequest<any>) : HttpHeaders{
    if (this.tokenValue)
      return req.headers.set(AuthService.TOKEN_NAME, this.tokenValue);
    else
      return req.headers;
  }

  saveAuthorization(res: HttpResponse<any>) {
    this.tokenValue = res.headers.get(AuthService.TOKEN_NAME)
  }

  clearAuthorization() {
    this.tokenValue = null;
  }

}
