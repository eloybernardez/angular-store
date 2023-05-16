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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/v1/auth`;
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.apiUrl}/login`, { email, password })
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

  profile(token: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<User>(`${this.apiUrl}/profile`, { headers }).pipe(
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

}
