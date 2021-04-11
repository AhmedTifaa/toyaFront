import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  cartItems:any;
  isEmpty:boolean = true;
  total:number = 0;
  currentStep:number = 1;
  currentQuantity:number = 1;
  viewCartStatus:boolean = false;
  isOn:boolean = false;
  lang:string;
  constructor(private cartService:CartService) {
    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
    this.cartItems =this.cartService.getItems()
    if (this.cartItems) {
      this.viewCartStatus = true;
      this.checkIsOn();
    }
    this.cartItems.length > 0 ? this.isEmpty = false : this.isEmpty = true;
    this.cartItems.forEach(product => {
      this.currentQuantity = product.quantity;
      this.total += (product.price - product.price * product.discount_percentage / 100)*product.quantity;
    });
   }

  ngOnInit() {
    console.log(this.cartItems);

  }
  checkIsOn(){
    if(this.viewCartStatus){
      this.isOn = true;
    }
  }

  removeProduct(id){
    // console.log(id);
    this.cartService.delItem(id);
    this.cartItems.length > 0 ? this.isEmpty = false : this.isEmpty = true;
    console.log(this.cartItems);
  }
  changeQuantity($event,id){
    var index = this.cartItems.findIndex(p => p.id == id);
    console.log(this.cartItems[index].quantity);
    this.cartItems[index].quantity = parseInt($event.target.value);
    console.log(this.cartItems[index].quantity);
    this.cartService.updateQuantity(id,$event.target.value);
    this.total = 0;
    this.cartItems.forEach(product => {
      this.total += (product.price - product.price * product.discount_percentage / 100)*product.quantity;
    });
  }
   nextStep(currentStep){
    this.currentStep = currentStep;
    console.log("from another side: "+this.currentStep);
    setTimeout(function(){
      window.scrollTo({
        left :0,
        top :(document.querySelectorAll('div.checkout-container')[0] as HTMLInputElement).offsetTop - (document.querySelector('.navbar.scroll.active') as HTMLInputElement).offsetHeight,
        behavior: 'smooth'
      });
    });
  }
  receiveMessage($event){
    console.log($event);
    this.currentStep = $event;
  }


}
