import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl,Validators, FormBuilder  } from '@angular/forms';
import { CartService } from '../cart/cart.service';
import { ViewCartComponent } from '../view-cart/view-cart.component';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  countriesList:any;
  citiesList:any;
  regionsList:any;
  confirmForm: FormGroup;
  submitted:boolean = false;
  orderShipping:any;
  orderProducts:Array<object> = [];
  @Output() messageEvent = new EventEmitter<number>();
  constructor(private checkoutService:CheckoutService,private cartService:CartService,private formBuilder: FormBuilder) {
    this.checkoutService.getCountry().subscribe(data=>{
      this.countriesList = data['data'];
      console.log(data);
    });
  }
  onChangeCountry($event){
    this.checkoutService.getCity($event.target.value).subscribe(data=>{
      this.citiesList = data['data'];
    });
  }
  onChangeCity($event){
    this.checkoutService.getRegion($event.target.value).subscribe(data=>{
      this.regionsList = data['data'];
    });
  }
  ngOnInit() {
    this.confirmForm = this.formBuilder.group({
      firstName: ['', [Validators.required,Validators.minLength(2)]],
      lastName: ['', [Validators.required,Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      address2: [''],
      phone: ['',[Validators.required, Validators.pattern("[0-9 ]{11}")]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
      zip: [''],
    });
  }
  confirm(){

    this.submitted = true;
    if(this.confirmForm.valid){
      this.cartService.getItems().forEach(item => {
        this.orderProducts.push({"product_id":item.id,"quantity":item.quantity});
      });
      this.orderShipping = {
        "products_data" : this.orderProducts,
        "name" : this.confirmForm.value.firstName +' '+this.confirmForm.value.lastName,
        "email" : this.confirmForm.value.email,
        "mobile" : this.confirmForm.value.phone,
        "zip_code" : this.confirmForm.value.zip,
        "address" : this.confirmForm.value.address,
        "street" : this.confirmForm.value.address2,
        "country" : this.confirmForm.value.country,
        "city" : this.confirmForm.value.city,
        "region" : this.confirmForm.value.region,
      }
      this.checkoutService.confirmOrder(this.orderShipping).subscribe(data=>{
        if(data['status'] == 200){
          // this.removeClass(document.querySelector(".image-order-status-checkout") as HTMLInputElement,"active");
          // this.addClass(document.querySelector(".image-order-status-thanks") as HTMLInputElement,"active");
          // this.addClass(document.querySelector(".order-status-timeline-completion") as HTMLInputElement,"c3");
          this.messageEvent.emit(3);

        }
      });
    }
    console.log(this.confirmForm.value);
    console.log(this.confirmForm.valid);
    console.log(this.confirmForm.controls);
  }




}
