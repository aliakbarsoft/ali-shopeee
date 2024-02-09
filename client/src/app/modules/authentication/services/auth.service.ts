import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { IUser, LoginDTO, LoginResultDTO } from "../interfaces/user";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { StorageService } from "../../../shared/clinet-service/storage.service";
import { NumberUtility } from "../../../shared/utilities/number.utilities";
import { tokenRemainingTime } from "../../../shared/global-variable/token-time-variable";
import { IRegister } from "../interfaces/register.dto";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private url = "http://localhost:3000/v1/auth/";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {}

 





}
