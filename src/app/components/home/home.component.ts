import { Component, OnInit } from '@angular/core';
import { RecentProductsService } from "./recent-products.service";
import { CatProductsService } from "./cat-products.service";
import { CartService } from '../cart/cart.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements  OnInit {

  // currentRate = 3;

  recentData:any;
  recentServiceStatus:boolean = false;
  catServiceStatus:boolean = false;
  catData:any;
  isOn:boolean = false;
  cartProducts:any;

  closeResult: string;

  success:boolean = false;
  successMessage:string;
  delay:any;

  lang:string;
  constructor(private recentProductsService:RecentProductsService, private catProductsService:CatProductsService, private cartService:CartService) {
    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
    this.recentProductsService.lang = this.lang;
    this.catProductsService.lang =this.lang;

    this.recentProductsService.getRecentProduct().subscribe(data=>{
      this.recentData = data["data"];
      this.recentServiceStatus = true;
      this.checkIsOn();
      // console.log(this.recentData);
      this.recentData.forEach(el => {
        this.cartProducts = this.cartService.getItems();
        this.cartProducts.forEach(item => {
          let id = item.id;
          if (el.id == id) {
            el.addedCart = true;
          }
        });
      }); 
      
    });

    this.catProductsService.getCatProduct().subscribe(data=>{
      this.catData = data["data"];
      this.catServiceStatus = true;
      this.checkIsOn();
      
      this.catData.forEach(cat => {
        cat.products.forEach(product => {
          this.cartProducts = this.cartService.getItems();
          this.cartProducts.forEach(item => {
            let id = item.id;
            if (product.id == id) {
              product.addedCart = true;
            }
          });
        });
      });

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
    let id = product.id;
    
    this.recentData.forEach(el => {
      if (el.id == id) {
        el.addedCart = true;
      }
    });

    this.catData.forEach(cat => {
      cat.products.forEach(catProduct => {
        if (catProduct.id == id) {
          catProduct.addedCart = true;
        }
      });
    });

    this.showAlert();

  }
  
  ngOnInit(): void {

  }

  // alert
  close() {
    this.success = false;
    clearTimeout(this.delay);
  };


  showAlert() { 
    this.success = true;
    this.lang == 'ar'? this.successMessage =  'تم الإضافة للسلة بنجاح' : this.successMessage =  "Added To Cart Successfuly";
    // this.successMessage = "Added To Cart Successfuly"; 
    this.delay = setTimeout(() => this.success = false, 6000); 
  }

  mouseOver(){
    clearTimeout(this.delay);
  }

  mouseOut(){
    this.delay = setTimeout(() => this.success = false, 6000);
  }

  // rate
  rate(rate){
    console.log(rate);
  }

}