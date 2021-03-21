import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsService } from 'src/app/components/product-details/product-details.service';
import { CartService } from '../cart/cart.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  
  closeResult: string;

  constructor(private router:Router,private productService:ProductDetailsService,private aRoute: ActivatedRoute,private cartService:CartService, private modalService: NgbModal) {
    const routeParams = this.aRoute.snapshot.paramMap;
    const productId = Number(routeParams.get('productId'));
    // console.log(productId);
    this.productService.url =  "http://localhost:8000/api/product/"+productId;
    // console.log(this.router.getCurrentNavigation().extras.state);
    this.productService.getProduct().subscribe(data=>{
      // console.log(data);
      this.data = data["data"];
      // console.log(this.data);

      this.cartProducts = this.cartService.getItems();
      this.cartProducts.forEach(item => {
        let id = item.id;
        if (this.data.id == id) {
          this.data.addedCart = true;
        }
      });

    });
  }
  
  addToCart(product, content) {
    console.log(this.input.nativeElement.value);
    this.cartService.addToCart(product,this.input.nativeElement.value);
    let id = product.id;
    if (this.data.id == id) {
      this.data.addedCart = true;
    }

    this.open(content);

  }

  ngOnInit() {
    if (sessionStorage.getItem('userToken') != null) {
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  }

  favourite(id){
    console.log(id);
    this.productService.data = {'product_id': id};
    this.productService.favourite().subscribe(response => {
      this.response = response;
      this.router.navigate(['/my-account']);  
    });
  }

  // start modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // end modal

}
