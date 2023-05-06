import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

// Services used the Singleton pattern, which means that there is only one instance of the service in the application.
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

  private shoppingCart: Product[] = [];

  getShoppingCart() {
    return this.shoppingCart;
  }

  addProduct(product: Product) {
    this.shoppingCart.push(product);
  }

  getTotal() {
    return this.shoppingCart.reduce((sum, product) => sum + product.price, 0);
  }
}
