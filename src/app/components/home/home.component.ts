import { Component, OnInit } from '@angular/core';
import { RecentProductsService } from "./recent-products.service";
import { CatProductsService } from "./cat-products.service";
import { CartService } from '../cart/cart.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements  OnInit {

  recentData:any;
  recentServiceStatus:boolean = false;
  catServiceStatus:boolean = false;
  catData:any;
  isOn:boolean = false;
  cartProducts:any;

  closeResult: string;

  constructor(private recentProductsService:RecentProductsService, private catProductsService:CatProductsService, private cartService:CartService, private modalService: NgbModal) {
    this.recentProductsService.getRecentProduct().subscribe(data=>{
      this.recentData = data["data"];
      this.recentServiceStatus = true;
      this.checkIsOn();
  
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

  addToCart(product, content) {
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

    this.open(content);

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

  ngOnInit() {
  }

}