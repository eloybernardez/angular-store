import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { pipe, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // We are using a proxy (works only in development). Using an environment we let Angular know when to use API_URL from prod or dev
  private apiUrl = `${environment.API_URL}/api/v1/products`;
  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && typeof offset == 'number' && offset >= 0) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    // Retry three times the request
    return this.http
      .get<Product[]>(`${this.apiUrl}`, {
        params: params,
      })
      .pipe(retry(3));
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.Conflict) {
          // code: 409
          // this error message will be returned when we catch the error in subscribe(error:(response)=> ...)
          return throwError(() => new Error('Ups, server error'));
        } else if (error.status == HttpStatusCode.NotFound) {
          return throwError(() => new Error('Ups, product not found'));
        } else if (error.status == HttpStatusCode.Unauthorized) {
          // code: 401
          return throwError(() => new Error('Ups, you are not authorized'));
        } else {
          return throwError(() => new Error('Ups, something went wrong'));
        }
      })
    );
  }

  create(data: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, data);
  }

  update(id: string, data: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
