import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from "./category.service";
import { CartService } from "../cart/cart.service";

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  data:any;
  filterData:any;
  space:any;
  filterStatus:boolean = false;

  cartProducts:any;
  check:boolean = false;
  closeResult: string;
  // status:boolean = true;

  success:boolean = false;
  successMessage:string;
  delay:any;

  @ViewChild('status') buttonElement:ElementRef;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private cartService:CartService, private modalService: NgbModal) {

    const routeParams = this.route.snapshot.paramMap;
    const categoryIdFromRoute = Number(routeParams.get('categoryId'));
    this.categoryService.url = "http://localhost:8000/api/category/" + categoryIdFromRoute;
    this.categoryService.filterUrl = "http://localhost:8000/api/filter/get/category/" + categoryIdFromRoute;
    console.log(this.categoryService.url);

    this.categoryService.getCategory().subscribe(data=>{
      this.data = data["data"];
      console.log(this.data);
      this.check = true;
      this.data.products.data.forEach(el => {
        this.cartProducts = this.cartService.getItems();
        this.cartProducts.forEach(item => {
          let id = item.id;
          if (el.id == id) {
            el.addedCart = true;
          }
        });
      });

    });

    this.categoryService.getFilter().subscribe(data=>{
      this.filterData = data["filters"];
      if(this.filterData.length > 0){
        this.filterStatus = true;
      }
      console.log(this.filterStatus);
      console.log(this.filterData);
    });

  }

  addToCart(product, content) {
    this.cartService.addToCart(product,1);
    let id = product.id;
    this.data.products.data.forEach(el => {
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

  calcProductWidth(){
    this.space = document.querySelectorAll('.products')[0].clientWidth;

  }

  ngOnInit() {


  }

  // alert
  close() {
    clearTimeout(this.delay);
    this.success = false;
  };


  showAlert() { 
    this.success = true;
    this.successMessage = "Added To Cart Successfuly"; 
    this.delay = setTimeout(() => this.success = false, 6000); 
  }

  mouseOver(){
    clearTimeout(this.delay);
  }

  mouseOut(){
    this.delay = setTimeout(() => this.success = false, 6000);
  }

}
