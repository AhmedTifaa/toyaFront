import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsService } from 'src/app/components/product-details/product-details.service';
import { CartService } from '../cart/cart.service';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  data:any;
  response:any;
  @ViewChild('quantity') input:ElementRef;
  isLogin:boolean = false;
  cartProducts:any
  
  productStatus:boolean = false;
  isOn:any = false;

  closeResult: string;

  success:boolean = false;
  successMessage:string;
  delay:any;  
  lang:string;
  constructor(private router:Router,private productService:ProductDetailsService,private aRoute: ActivatedRoute,private cartService:CartService, private modalService: NgbModal) {
    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
    const routeParams = this.aRoute.snapshot.paramMap;
    const productId = routeParams.get('productId');
    this.productService.url =  "http://localhost:8000/api/product/"+productId;
    this.productService.lang = this.lang;
    this.productService.getProduct().subscribe(data=>{
      this.data = data["data"];

      this.cartProducts = this.cartService.getItems();
      this.cartProducts.forEach(item => {
        let id = item.id;
        if (this.data.id == id) {
          this.data.addedCart = true;
        }
      });

      this.productStatus = true;
      this.checkIsOn();

      console.log(this.data);
    });
  }
  

  checkIsOn(){
    if(this.productStatus){
      this.isOn = true;
    }
  }

  addToCart(product) {
    console.log(this.input.nativeElement.value);
    this.cartService.addToCart(product,this.input.nativeElement.value);
    let id = product.id;
    if (this.data.id == id) {
      this.data.addedCart = true;
    }

    this.lang == 'ar'? this.successMessage =  'تم الإضافة للسلة بنجاح' : this.successMessage =  "Added To Cart Successfuly"; 
    this.showAlert();

  }

  ngOnInit() {
    if (sessionStorage.getItem('userToken') != null) {
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  }

  favourite(id){
    // console.log(id);
    this.productService.data = {'product_id': id};
    this.productService.favourite().subscribe(response => {
      this.response = response;
      // this.router.navigate(['/my-account']);
      this.lang == 'ar'? this.successMessage =  'تم الإضافة للمفضلة بنجاح' : this.successMessage =  "Added To Favourite Successfuly";
      // this.successMessage = "Added To Favourite Successfuly"; 
      this.showAlert(); 
    });
  }

  // alert
  close() {
    this.success = false;
    clearTimeout(this.delay);
  };


  showAlert() { 
    this.success = true;
    this.delay = setTimeout(() => this.success = false, 6000); 
  }

  mouseOver(){
    clearTimeout(this.delay);
  }

  mouseOut(){
    this.delay = setTimeout(() => this.success = false, 6000);
  }

}
