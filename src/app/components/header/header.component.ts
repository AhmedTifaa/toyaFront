import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  scrollVal:any;
  constructor() {
    
   }

    hasClass(ele,cls) {
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  }
  
   addClass(ele,cls) {
    if (!this.hasClass(ele,cls)) ele.className += " "+cls;
  }
  
   removeClass(ele,cls) {
    if (this.hasClass(ele,cls)) {
      var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
      ele.className=ele.className.replace(reg,' ');
    }
  }

  ngOnInit() {
    this.scrollVal = (document.querySelectorAll(".navbar:not(.scroll)")[0] as HTMLInputElement).offsetHeight +
    (document.querySelectorAll(".navbar:not(.scroll)")[0] as HTMLInputElement).offsetTop;
    var ele = (document.querySelectorAll(".navbar.scroll")[0] as HTMLInputElement)
    window.onscroll = ()=>{
      if(window.scrollY > this.scrollVal){
        
        this.addClass(ele,"active");
        
      }else{
        this.removeClass(ele,"active");
      }
    }
  }
  public isMenuCollapsed = true;
}
