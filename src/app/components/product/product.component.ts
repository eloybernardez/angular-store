import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Output() addedProduct = new EventEmitter<Product>();
  @Input() product: Product = {
    id: '',
    name: '',
    image: '',
    price: 0,
  };

  onAddToCart() {
    // Tell the parent element to add the product to the cart
    this.addedProduct.emit(this.product);
  }
}
