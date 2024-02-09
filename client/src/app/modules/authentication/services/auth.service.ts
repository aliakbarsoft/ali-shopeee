import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { IUser, LoginDTO, LoginResultDTO } from "../interfaces/user";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { tap } from "rxjs/operators";
import { StorageService } from "../../../shared/clinet-service/storage.service";
import { NumberUtility } from "../../../shared/utilities/number.utilities";
import { tokenRemainingTime } from "../../../shared/global-variable/token-time-variable";
import { IRegister } from "../interfaces/register.dto";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId!: Pick<IUser, "id">;
  userName = new BehaviorSubject<string>("");
  setEmailUser = new BehaviorSubject<string>("");
  id!: number;
  getEmail!: string;

  /**
   * Token expiration time management
   */
  accessTokenValue: string | null;
  accessTokenStoreTime: number;
  accessTokenPeriod: number;
  refreshTokenValue: string | null;
  refreshTokenStoreTime: number;
  refreshTokenPeriod: number;

  accessTokenTimeUnsubscriber: Subscription;
  accessTokenTimer$: Observable<number>;
  refreshTokenTimeUnsubscriber: Subscription;
  refreshTokenTimer$: Observable<number>;

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

  register(user: IRegister): Observable<IRegister> {
    return this.http.post<IRegister>(
      `${this.url}sign-up/`,
      user,
      this.httpOptions
    );
  }

  login(model: LoginDTO): Observable<LoginResultDTO> {
    return this.http.post<LoginResultDTO>(`${this.url}sign-in`, model).pipe(
      tap((result: LoginResultDTO) => {
        this.storageService.storeTokens(result);
        this.initTokenExpireTimeManagement();
      })
    );
  }

  // login(
  //   email: Pick<IUser, "email">,
  //   password: Pick<IUser, "password">
  // ): Observable<any> {
  //   return this.http.post(
  //     `${this.url}sign-in`,
  //     { email, password },
  //     this.httpOptions
  //   );
  // }

  requestReset(email: string): Observable<any> {
    return this.http.get(`${this.url}forget/${email}`);
  }

  confirmForget(code: string): Observable<string> {
    this.setEmailUser.subscribe((res) => {
      this.getEmail = res;
    });

    const body = {
      verify_code: code,
      email: this.getEmail,
    };
    return this.http.post<string>(
      `${this.url}forget-confirm`,
      body,
      this.httpOptions
    );
  }

  changePassword(password): Observable<any> {
    this.setEmailUser.subscribe((res) => {
      this.getEmail = res;
    });

    const body = {
      verify_code: password,
      email: this.getEmail,
    };
    return this.http.post(`${this.url}change-pass`, body, this.httpOptions);
  }

  initTokenExpireTimeManagement(): void {
    this.accessTokenValue = this.storageService.getAccessToken();
    this.accessTokenPeriod = this.storageService.getAccessTokenPeriod();
    this.accessTokenStoreTime = this.storageService.getAccessTokenStoreTime();

    this.refreshTokenValue = this.storageService.getRefreshToken();
    this.refreshTokenPeriod = this.storageService.getRefreshTokenPeriod();
    this.refreshTokenStoreTime = this.storageService.getRefreshTokenStoreTime();

    if (this.hasToken) {
      this.checkAccessTokenExpireTime();
      this.checkRefreshTokenExpireTime();
    } else {
      tokenRemainingTime.reset();
    }
  }

  private hasToken(): boolean {
    return Boolean(
      this.accessTokenValue &&
        this.accessTokenPeriod &&
        this.accessTokenStoreTime &&
        this.refreshTokenValue &&
        this.refreshTokenPeriod &&
        this.refreshTokenStoreTime
    );
  }
  private checkAccessTokenExpireTime(): void {
    if (this.accessTokenStoreTime) {
      let now = new Date().getTime();
      let spentTime = now - this.accessTokenStoreTime;

      if (spentTime < this.accessTokenPeriod) {
        let remainingTime = this.accessTokenPeriod - spentTime;
        this.setTimerForAccessToken(remainingTime);
      } else {
        tokenRemainingTime.resetAccessTokenTime();
      }
    }
  }

  private checkRefreshTokenExpireTime(): void {
    if (this.refreshTokenStoreTime) {
      let now = new Date().getTime();
      let spentTime = now - this.refreshTokenStoreTime;

      if (spentTime < this.refreshTokenPeriod) {
        let remainingTime = this.refreshTokenPeriod - spentTime;
        this.setTimerForRefreshToken(remainingTime);
      } else {
        tokenRemainingTime.resetRefreshTokenTime();
      }
    }
  }

  private setTimerForRefreshToken(time: number): void {
    if (this.refreshTokenTimeUnsubscriber) {
      this.refreshTokenTimeUnsubscriber.unsubscribe();
    }
    // A downCounter for RefreshToken remaining time
    let timeInSecond = Math.floor(time / 1000);
    tokenRemainingTime.data.refreshTokenTime = timeInSecond;
    this.refreshTokenTimer$ = NumberUtility.countDown(timeInSecond);
    this.refreshTokenTimeUnsubscriber = this.refreshTokenTimer$.subscribe(
      (num: number) => {
        tokenRemainingTime.data.refreshTokenTime = num;
      }
    );
  }

  private setTimerForAccessToken(time: number): void {
    if (this.accessTokenTimeUnsubscriber) {
      this.accessTokenTimeUnsubscriber.unsubscribe();
      // A downCounter for AccessToken remaining time
      let timeInSecond = Math.floor(time / 1000);
      tokenRemainingTime.data.accessTokenTime = timeInSecond;
      this.accessTokenTimer$ = NumberUtility.countDown(timeInSecond - 1);
      this.accessTokenTimeUnsubscriber = this.accessTokenTimer$.subscribe(
        (num: number) => {
          tokenRemainingTime.data.accessTokenTime = num;
        }
      );
    }
  }
}
