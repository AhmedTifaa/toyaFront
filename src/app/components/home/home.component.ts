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
    this.recentProductsService.getRecentProduct().subscribe(recentData=>{
      this.recentData = recentData["recentData"];
    });

    this.catProductsService.getCatProduct().subscribe(catData=>{
      this.catData = catData["catData"];
    });
  }

  ngOnInit() {
  }

}
