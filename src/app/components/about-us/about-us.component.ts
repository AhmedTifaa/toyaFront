import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor() { 
    
  }
  
  ngOnInit() {
    // console.log(document.getElementsByClassName('content')[0].lastChild.lastChild.childNodes[0].nodeValue);
    console.log((document.querySelector('.content .img-container img') as HTMLInputElement));
  }

}
