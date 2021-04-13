import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from "./category.service";
import { CartService } from "../cart/cart.service";
import { FilterService } from "../../components/products-page/filter.service";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  id:any;
  data:any;
  filterData:any;
  space:any;
  categoryStatus:boolean = false;
  filterStatus:boolean = false;
  isOn:boolean = false;

  filterProperties:any;
  filterCheck:boolean = false;
  cartProducts:any;
  check:boolean = false;
  closeResult: string;

  success:boolean = false;
  successMessage:string;
  delay:any;

  categoryIdFromRoute:any;

  lang:string;

  @ViewChild('status') buttonElement:ElementRef;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private cartService:CartService, private filterService:FilterService) {
    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');

    this.route.params.subscribe(param => {
      this.setUpComponent(param['categoryId']);
    });
  }

  setUpComponent(setParam){
    this.isOn = false;

    this.categoryIdFromRoute = setParam

    this.categoryService.url = "http://localhost:8000/api/category/" + this.categoryIdFromRoute;
    this.categoryService.lang = this.lang;
    this.categoryService.getCategory().subscribe(data=>{
      this.id = data["data"].id;


      // get filter
      this.categoryService.filterUrl = "http://localhost:8000/api/filter/get/category/" + this.id ;
      this.categoryService.getFilter().subscribe(data=>{
        this.filterData = data["filters"];
        if(this.filterData.length > 0){
          this.filterCheck = true;
        }
        // console.log(this.filterData);
        this.filterData.forEach(element => {
          if (element.input_type == "range") {
            let rangeArray = element.values;
            element.min = Math.min.apply(Math, rangeArray);
            element.max = Math.max.apply(Math, rangeArray);
          }
        });
        this.filterStatus = true;
        this.checkIsOn();
      });

      this.applyFilter()
    });

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

  calcProductWidth(){
    this.space = document.querySelectorAll('.products')[0].clientWidth;

  }


  checkIsOn(){
    if(this.categoryStatus && this.filterStatus){
      this.isOn = true;
      if(this.isOn){
        this.categoryStatus = this.filterStatus = false;
      }
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

  ngOnInit() {
    // reset filter
    // let button:HTMLInputElement = document.querySelector('.card button[aria-expanded="false"]');

  }

  // reset filter
  resetFilter(element:HTMLInputElement){
    if ((element.parentElement.className) != "btn btn-link collapsed") {
      element.parentElement.parentElement.nextElementSibling.remove();
      this.applyFilter();
    }
  }

  // search filter
  applyFilter(){
    this.filterService.url = 'http://localhost:8000/api/filter/search/category/' + this.id ;
    this.filterService.lang = this.lang;
    let apply = this.collectFilter();
    let applyData = {
      properties : apply
    }
    this.filterService.filter(applyData).subscribe(data => {
      console.log(data);
      this.filterProperties = apply;
      this.data = data;
      this.check = true;
      this.categoryStatus = true;
      this.checkIsOn();
      this.data.data.forEach(el => {
        this.cartProducts = this.cartService.getItems();
        this.cartProducts.forEach(item => {
          let id = item.id;
          if (el.id == id) {
            el.addedCart = true;
          }
        });
      });
    })
    // console.log(apply);
  }

  collectFilter(){
    let dataFilter:Array<any> = [];

    // range
    let from:HTMLInputElement = document.querySelector('input.from');
    let to:HTMLInputElement = document.querySelector('input.to');
    if (from != null || to != null ) {
      if (from.value > '0' || to.value > '0') {
        let data_range_object = {
          property_name : from.name,
          from : from.value,
          to : to.value
        }
        dataFilter.push(data_range_object);
      }
    }


    // color
    let colorValue:Array<any> = [];
    let colorName;
    if (document.querySelectorAll('input.color[type="checkbox"]:checked').length > 0) {
      document.querySelectorAll('input.color[type="checkbox"]:checked').forEach(element => {
        colorValue.push(element.getAttribute('value'));
        colorName = element.getAttribute('name');
      });
    }
    if (colorValue.length > 0) {
      let data_color_object = {
        property_name : colorName,
        values : colorValue
      }
      dataFilter.push(data_color_object);
    };


    // checkbox
    let checkValue:Array<any> = [];
    let checkName;
    if (document.querySelectorAll('input.checkbox[type="checkbox"]:checked').length > 0) {
      document.querySelectorAll('input.checkbox[type="checkbox"]:checked').forEach(element => {
        checkValue.push(element.getAttribute('value'));
        checkName = element.getAttribute('name');
      });
    }
    if (checkValue.length > 0) {
      let data_check_object = {
        property_name : checkName,
        values : checkValue
      }
      dataFilter.push(data_check_object);
    }


    // radio
    let radioValue:Array<any> = [];
    let inputValue;
    let name;
    if (document.querySelectorAll('input.radio[type="radio"]:checked').length > 0) {
      inputValue = document.querySelectorAll('input.radio[type="radio"]:checked')[0].getAttribute('value');
      name = document.querySelectorAll('input.radio[type="radio"]:checked')[0].getAttribute('name');
      radioValue.push(inputValue);
    }
    if (radioValue.length > 0) {
      let data_radio_object = {
        property_name : name,
        values : radioValue
      }
      dataFilter.push(data_radio_object);
    }

    return dataFilter;
    // console.log(dataFilter);
  }

  // get min value of array


}
