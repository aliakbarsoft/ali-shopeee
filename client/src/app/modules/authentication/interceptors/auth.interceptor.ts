import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}


  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    
    // const httpOptions: { headers: HttpHeaders } = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   }),
    // };

    const jwt = localStorage.getItem("access_token");
    return next.handle(
      request.clone({ setHeaders: { authorization: `Bearer ${jwt}` } })
    );
  }
}
