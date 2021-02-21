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
  total:number = 0;
  currentStep:number = 1;
  constructor(private cartService:CartService) {
    this.cartItems = this.cartService.getItems();
    this.cartItems.forEach(product => {
      this.total += (product.price - product.price * product.discount_percentage / 100)*product.quantity;
    });
   }

  ngOnInit() {
    console.log(this.cartItems);

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
