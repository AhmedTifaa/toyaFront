import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from "./category.service";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  data:any;
  filterData:any;
  constructor(private route: ActivatedRoute, private categoryService: CategoryService) { 
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
      console.log(this.filterData);
    });
    
  }

  ngOnInit() {
    
    
  }

}
