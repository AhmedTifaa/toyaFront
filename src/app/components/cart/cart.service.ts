import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];

  getItems() {
    console.log(this.items);
    return this.items;
  }
  
  addToCart(product) {
    this.items.push(product);
    console.log(this.items);
    this.getItems();
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
