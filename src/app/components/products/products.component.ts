import { Component, OnInit } from '@angular/core';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from 'src/app/models/product.model';
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
  limit = 10;
  offset = 0;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.shoppingCart = this.storeService.getShoppingCart();
  }

  loadProducts(limit?: number, offset?: number) {
    this.productsService.getAllProducts(limit, offset).subscribe((data) => {
      this.products = this.products.concat(data);
    });
  }

  ngOnInit() {
    this.loadProducts(this.limit, this.offset);
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

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'New Product',
      description: 'new',
      price: 555,
      images: ['https://placeimg.com/640/480/any'],
      categoryId: 2,
    };
    this.productsService.create(product).subscribe((data) => {
      console.log('Created =>', data);
      // Add the product to the UI
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const product: UpdateProductDTO = {
      title: 'New Product Updated',
      description: 'used',
      price: 220,
      images: ['https://placeimg.com/640/480/any'],
      categoryId: 2,
    };
    const id = this.productChosen.id;

    this.productsService.update(id, product).subscribe((data) => {
      console.log('updated', data);
      const productIndex = this.products.findIndex((item) => item.id === id);
      // Update in products and productChosen
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;

    this.productsService.delete(id).subscribe(() => {
      this.products = this.products.filter((item) => item.id !== id);
      this.showProductChosen = false;
    });
  }

  loadMore() {
    this.offset += this.limit + 1;
    this.loadProducts(this.limit, this.offset);
  }
}
