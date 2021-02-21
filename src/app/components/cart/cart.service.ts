import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = JSON.parse(window.sessionStorage.getItem('cart-toya')) || [];
  sessionItems = [];
  private itemsCount = new BehaviorSubject(this.items.length);
  currentitemsCount = this.itemsCount.asObservable() ;

  getItems() {
    console.log(this.items);
    return this.items;
  }

  addToCart(product,quantity) {
    product.quantity = quantity;
    this.sessionItems.push({id:product.id,quantity:quantity});
    this.items.push(product);
    window.sessionStorage.setItem('cart',JSON.stringify(this.sessionItems));
    window.sessionStorage.setItem('cart-toya',JSON.stringify(this.items));
    this.changeItemsCount(this.itemsCount.value + 1);
    console.log(product);
    console.log(this.itemsCount);
    // console.log(this.items);
    // this.getItems();
  }
  changeItemsCount(count: number) {
    this.itemsCount.next(count);
  }

  delItem(id) {
    let index;
    for (let i=0; i < this.items.length; i++){
      if(this.items[i].id == id){
         index = i;
         this.items.splice(i, 1);
         break;
      }
    }
    this.getItems();
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.getItems();
    return this.items;
  }

  constructor() { }
}
