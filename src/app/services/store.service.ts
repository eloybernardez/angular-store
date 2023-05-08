import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

// Services used the Singleton pattern, which means that there is only one instance of the service in the application.
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private shoppingCart: Product[] = [];

  // Store
  // new BehaviorSubject<Type>(initialValue)
  private myCart = new BehaviorSubject<Product[]>([]);

  // Observable -> name$ = this.behaviorSubject.asObservable();
  // observables listens to changes in the BehaviorSubject
  myCart$ = this.myCart.asObservable();

  getShoppingCart() {
    return this.shoppingCart;
  }

  addProduct(product: Product) {
    this.shoppingCart.push(product);

    // next() is used to emit new values to the Observable
    this.myCart.next(this.shoppingCart);
  }

  getTotal() {
    return this.shoppingCart.reduce((sum, product) => sum + product.price, 0);
  }
}
