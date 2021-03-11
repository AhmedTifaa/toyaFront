import { Component, OnInit } from '@angular/core';
import { RecentProductsService } from "./recent-products.service";
import { CatProductsService } from "./cat-products.service";
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentData:any;
  recentServiceStatus:boolean = false;
  catServiceStatus:boolean = false;
  catData:any;
  isOn:boolean = false;

  constructor(private recentProductsService:RecentProductsService, private catProductsService:CatProductsService, private cartService:CartService) {
    this.recentProductsService.getRecentProduct().subscribe(data=>{
      this.recentData = data["data"];
      this.recentServiceStatus = true;
      this.checkIsOn();
    });

    this.catProductsService.getCatProduct().subscribe(data=>{
      this.catData = data["data"];
      this.catServiceStatus = true;
      this.checkIsOn();
      console.log(this.catData)
    });
  }
  checkIsOn(){
    if(this.recentServiceStatus && this.catServiceStatus){
      this.isOn = true;
    }
  }
  discountValidate(discountValue){
    var valid = false;
    if(parseInt(discountValue) > 0){
      valid = true;
    }
    return valid;
  }
  addToCart(product) {
    this.cartService.addToCart(product,1);
  }
  ngOnInit() {

  }

}
