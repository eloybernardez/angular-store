import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  openMenu = false;
  counter = 0;

  constructor(private storeService: StoreService) {}

  // We subscribe to the Observable myCart$ in the ngOnInit() method.
  ngOnInit(): void {
    this.storeService.myCart$.subscribe((cart) => {
      this.counter = cart.length;
    });
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }
}
