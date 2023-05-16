import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/v1/auth`;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => this.tokenService.saveToken(response.access_token))
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == HttpStatusCode.Conflict) {
            return throwError(() => new Error('Ups, server error'));
          } else if (error.status == HttpStatusCode.NotFound) {
            return throwError(() => new Error('Ups, product not found'));
          } else if (error.status == HttpStatusCode.Unauthorized) {
            return throwError(() => new Error('Ups, you are not authorized'));
          } else {
            return throwError(() => new Error('Ups, something went wrong'));
          }
        })
      );
  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.Conflict) {
          return throwError(() => new Error('Ups, server error'));
        } else if (error.status == HttpStatusCode.NotFound) {
          return throwError(() => new Error('Ups, product not found'));
        } else if (error.status == HttpStatusCode.Unauthorized) {
          return throwError(() => new Error('Ups, you are not authorized'));
        } else {
          return throwError(() => new Error('Ups, something went wrong'));
        }
      })
    );
  }

  loginAndProfile(email: string, password: string) {
    return this.login(email, password).pipe(switchMap(() => this.getProfile()));
  }
}
