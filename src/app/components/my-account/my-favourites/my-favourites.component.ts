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

  myFavouriteStatus:boolean = false;
  isOn:boolean = false;
  lang:string;
  constructor(private myFavouritesService:MyFavouritesService, private cartService:CartService) {
    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
    this.myFavouritesService.lang = this.lang;
    this.myFavouritesService.getProduct().subscribe(data => {
      this.products = data['data'];
      console.log(this.products);

      this.myFavouriteStatus = true;
      this.checkIsOn();

    });
  }

  addToCart(product) {
    this.cartService.addToCart(product,1);
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
