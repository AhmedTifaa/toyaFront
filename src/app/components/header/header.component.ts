import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  scrollVal:any;
  itemsCount:number = 0;
  subscription:Subscription;
  constructor(private cartService:CartService) {
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
    this.subscription = this.cartService.currentitemsCount.subscribe(count => this.itemsCount = count);
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
