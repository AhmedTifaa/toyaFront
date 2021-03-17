import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsService } from 'src/app/components/product-details/product-details.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  data:any;
  response:any;
  @ViewChild('quantity') input:ElementRef;
  constructor(private router:Router,private productService:ProductDetailsService,private aRoute: ActivatedRoute,private cartService:CartService) {
    const routeParams = this.aRoute.snapshot.paramMap;
    const productId = Number(routeParams.get('productId'));
    console.log(productId);
    this.productService.url =  "http://localhost:8000/api/product/"+productId;
    console.log(this.router.getCurrentNavigation().extras.state);
    this.productService.getProduct().subscribe(data=>{
      console.log(data);
      this.data = data["data"];
      console.log(this.data);
    });
  }
  addToCart(product) {
    console.log(this.input.nativeElement.value);
    this.cartService.addToCart(product,this.input.nativeElement.value);
  }

  ngOnInit() {
  }

  favourite(id){
    console.log(id);
    this.productService.data = {'product_id': id};
    this.productService.favourite().subscribe(response => {
      this.response = response;
      this.router.navigate(['/my-account']);  
    });
  }

}
