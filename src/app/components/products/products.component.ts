import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  shoppingCart: Product[] = [];
  products: Product[] = [];
  productChosen!: Product;
  showProductChosen = false;
  total = 0;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.shoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit() {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  toggleProductChosen() {
    this.showProductChosen = !this.showProductChosen;
  }

  onShowDetail(id: string) {
    this.productsService.getProduct(id).subscribe((data) => {
      // Close side menu
      this.toggleProductChosen();
      this.productChosen = data;
    });
  }

  onAddedToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
