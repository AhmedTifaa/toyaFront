import { Component, OnInit } from '@angular/core';
import { RecentProductsService } from "../home/recent-products.service";
import { CartService } from "../cart/cart.service";

@Component({
  selector: 'app-recent-product',
  templateUrl: './recent-product.component.html',
  styleUrls: ['./recent-product.component.css']
})
export class RecentProductComponent implements OnInit {

  data:any;
  isOn:boolean = false;

  check:boolean = false;

  success:boolean = false;
  successMessage:string;
  delay:any;
  lang:string;
  constructor(private recentProductsService:RecentProductsService, private cartService:CartService) { 
    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
    this.recentProductsService.lang = this.lang;
    this.recentProductsService.getAllRecentProduct().subscribe(data=>{
      this.data = data['data'];
      console.log(this.data);
      this.check = true;
      this.checkIsOn();
    });
  }

  ngOnInit() {
  }

  addToCart(product) {
    this.cartService.addToCart(product,1);
    let id = product.id;
    this.data.data.forEach(el => {
      if (el.id == id) {
        el.addedCart = true;
      }
    });

    this.showAlert();
  }

  removeFromCart(id){
    this.cartService.delItem(id);
  }

  discountValidate(discountValue){
    var valid = false;
    if(parseInt(discountValue) > 0){
      valid = true;
    }
    return valid;
  }

  checkIsOn(){
    if(this.check == true){
      this.isOn = true;
    }
  }

  // alert
  close() {
    clearTimeout(this.delay);
    this.success = false;
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


}
