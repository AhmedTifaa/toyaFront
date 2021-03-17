import { Component, OnInit } from '@angular/core';
import { AboutUsService } from "./about-us.service";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  check:boolean = false;
  data:any;
  constructor( private aboutUsService:AboutUsService) { 
    this.aboutUsService.getAboutUS().subscribe(data=>{
      this.data = data["about_us"];
      this.check = true;
      console.log(this.data);
    });
  }
  ngOnInit() {
    
    // console.log(document.getElementsByClassName('content')[0].lastChild.lastChild.childNodes[0].nodeValue);
    // console.log((document.querySelector('.content .img-container img') as HTMLInputElement));
  }

}
