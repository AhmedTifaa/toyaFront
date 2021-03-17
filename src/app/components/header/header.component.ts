import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  scrollVal:any;
  itemsCount:number = 0;
  subscription:Subscription;
  isLogin:boolean ;
  constructor(private cartService:CartService, private router:Router, private loginService:LoginService) {  

   

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
    // console.log(sessionStorage.getItem('userToken'));
    this.subscription = this.loginService.hasLogin.subscribe(data => this.isLogin = data);
    if (sessionStorage.getItem('userToken') != null) {
      this.isLogin = true;
    }
  }
  public isMenuCollapsed = true;

  
  logout(){
    sessionStorage.removeItem('userToken');
    this.loginService.checkLogin(false);
    this.router.navigate(['/login']);
  }

}
