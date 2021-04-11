import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  lang:string;
  constructor() { 
    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
  }

  ngOnInit() {
    
    
  }

  active(element:HTMLElement) {
    document.querySelector('ul.menu li.active').className = " ";
    element.className = "active"; 
    let content = element.getAttribute('data-content');
    document.querySelector('div.col-lg-9 .d-block').className = "d-none";
    document.querySelector(content).className = "d-block";
  }

}
