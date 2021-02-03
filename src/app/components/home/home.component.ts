import { Component, OnInit } from '@angular/core';
import { RecentProductsService } from "./recent-products.service";
import { CatProductsService } from "./cat-products.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentData:any;
  catData:any;
 
  constructor(private recentProductsService:RecentProductsService, private catProductsService:CatProductsService) { 
    this.recentProductsService.getRecentProduct().subscribe(data=>{
      this.recentData = data["data"];
    });

    this.catProductsService.getCatProduct().subscribe(data=>{
      this.catData = data["data"];
      console.log(this.catData)
    });
  }

  ngOnInit() {
  }

}
