import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  data:any;
  lang:string;
  constructor(private categoriesService:CategoriesService) {
    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
    this.categoriesService.lang = this.lang;
    this.categoriesService.getCategory().subscribe(data=>{
      this.data = data["data"];
      console.log(this.data);
    });
  }




  ngOnInit() {
  }

}
