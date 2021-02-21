import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from "./category.service";
import { CartService } from "../cart/cart.service";

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

  // status:boolean = true;

  @ViewChild('status') buttonElement:ElementRef;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private cartService:CartService) {

    const routeParams = this.route.snapshot.paramMap;
    const categoryIdFromRoute = Number(routeParams.get('categoryId'));
    this.categoryService.url = "http://localhost:8000/api/category/" + categoryIdFromRoute;
    this.categoryService.filterUrl = "http://localhost:8000/api/filter/get/category/" + categoryIdFromRoute;
    console.log(this.categoryService.url);

    this.categoryService.getCategory().subscribe(data=>{
      this.data = data["data"];
      console.log(this.data);
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

  addToCart(product) {
    this.cartService.addToCart(product,1);
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

}
