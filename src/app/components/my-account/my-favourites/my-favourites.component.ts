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
  constructor(private myFavouritesService:MyFavouritesService, private cartService:CartService) {
    this.myFavouritesService.getProduct().subscribe(data => {
      this.products = data['data'];
      console.log(this.products);
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

  ngOnInit() {
  }

}
