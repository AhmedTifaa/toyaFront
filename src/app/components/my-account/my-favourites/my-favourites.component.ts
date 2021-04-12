import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { MyFavouritesService } from './my-favourites.service';

@Component({
  selector: 'app-my-favourites',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.css']
})
export class MyFavouritesComponent implements OnInit {

  products:any;
  cartProducts:any;
  myFavouriteStatus:boolean = false;
  isOn:boolean = false;
  lang:string;
  constructor(private myFavouritesService:MyFavouritesService, private cartService:CartService) {
    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
    this.myFavouritesService.lang = this.lang;
    this.myFavouritesService.getProduct().subscribe(data => {
      this.products = data['data'];
      console.log(this.products);

      this.products.forEach(el => {
        this.cartProducts = this.cartService.getItems();
        this.cartProducts.forEach(item => {
          let id = item.id;
          if (el.id == id) {
            el.addedCart = true;
          }
        });
      });
      
      this.myFavouriteStatus = true;
      this.checkIsOn();
      
    });
  }

  addToCart(product) {
    this.cartService.addToCart(product,1);
    let id = product.id;
    
    this.products.forEach(el => {
      if (el.id == id) {
        el.addedCart = true;
      }
    });
  }

  delete(id){
    this.myFavouritesService.deleteUrl = "http://localhost:8000/api/favoriteProduct/" + id;
    this.myFavouritesService.deleteProduct().subscribe(response => {
      this.myFavouritesService.getProduct().subscribe(data => {
        this.products = data['data'];
        console.log(this.products);
      });
    });
  }

  checkIsOn(){
    if(this.myFavouriteStatus){
      this.isOn = true;
    }
  }

  ngOnInit() {
  }

}
