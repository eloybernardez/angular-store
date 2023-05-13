import { Component, OnInit } from '@angular/core';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from 'src/app/models/product.model';
import { switchMap } from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

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
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

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
    this.statusDetail = 'loading';
    this.productsService.getProduct(id).subscribe({
      next: (data) => {
        // Close side menu
        this.toggleProductChosen();
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      // handling errors
      error: (error: HttpErrorResponse) => {
        // console.error(errorMsj.message);
        this.statusDetail = 'error';
        Swal.fire({
          title: error.type,
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  onAddedToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  readAndUpdate(id: string) {
    // we use switchMap to consume the observable returned by getProduct
    this.productsService
      .getProduct(id)
      .pipe(
        switchMap((product) => {
          return this.productsService.update(product.id, {
            title: 'new title',
          });
          // this.productsService.update(product.id, { title: 'new title' });
          // this.productsService.update(product.id, { title: 'new title' });
        })
      )
      .subscribe((data) => {
        console.log(data);
      });

    // consuming read and update
    this.productsService
      .fetchReadAndUpdate(id, { title: 'updated name' })
      .subscribe((responses) => {
        const read = responses[0];
        const updated = responses[1];
      });

    // Callback hell
    // .subscribe((data) => {
    //   const id = data.id;
    //   this.productsService
    //     .update(id, { title: 'change' })
    //     .subscribe((rtaUpdate) => {
    //       console.log(rtaUpdate);
    //     });
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
