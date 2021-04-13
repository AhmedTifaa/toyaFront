import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = JSON.parse(window.sessionStorage.getItem('cart-toya')) || [];
  sessionItems = JSON.parse(window.sessionStorage.getItem('cart')) || [];
  private itemsCount = new BehaviorSubject(this.items.length);
  currentitemsCount = this.itemsCount.asObservable() ;

  getItems() {
    // console.log(this.items);
    return this.items;
  }

  addToCart(product,quantity) {
    product.quantity = quantity;
    this.sessionItems.push({id:product.id,quantity:quantity});
    this.items.push(product);
    window.sessionStorage.setItem('cart',JSON.stringify(this.sessionItems));
    window.sessionStorage.setItem('cart-toya',JSON.stringify(this.items));
    this.changeItemsCount(this.itemsCount.value + 1);
    // console.log(product);
    // console.log(this.itemsCount);
    // console.log(this.items);
    // this.getItems();
  }
  changeItemsCount(count: number) {
    this.itemsCount.next(count);
  }

  delItem(id) {
    var index = this.getItems().findIndex(p => p.id == id);
    this.items.splice(index, 1);
    this.sessionItems.splice(index, 1);
    window.sessionStorage.setItem('cart-toya',JSON.stringify(this.items));
    window.sessionStorage.setItem('cart',JSON.stringify(this.sessionItems));
    this.changeItemsCount(this.itemsCount.value - 1);
  }
  updateQuantity(id,quantity){
    var index = this.sessionItems.findIndex(p => p.id == id);
    this.sessionItems[index].quantity = quantity;
    window.sessionStorage.setItem('cart',JSON.stringify(this.sessionItems));
  }

  clearCart() {
    this.items = [];
    this.getItems();
    return this.items;
  }

  constructor() { }
}
