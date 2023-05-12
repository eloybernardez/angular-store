import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && typeof offset == 'number' && offset >= 0) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: params,
    });
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
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
