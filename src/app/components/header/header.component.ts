import { Component, OnInit, Inject  } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { HeaderService } from "../header/header.service";
import { DOCUMENT } from '@angular/common';

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

  data:any;
  check:any;
  // count:number;
  // half:number;
  // firstHalfMenue:any;
  // lastHalfMenue: any;

  lang:string;

  constructor(@Inject(DOCUMENT) private document, private cartService:CartService, private router:Router, private loginService:LoginService, private headerService:HeaderService) {  

    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');

    if (this.lang == 'ar') {
      var ar_css = this.document.createElement("link");
      ar_css.setAttribute("rel", "stylesheet");
      ar_css.setAttribute("type", "text/css");
      ar_css.setAttribute("href", "/assets/styles/ar.css");
      this.document.getElementsByTagName("head").item(0).appendChild(ar_css)
    }

    this.headerService.lang = this.lang;
    this.headerService.getNavbar().subscribe(data=>{
      this.data = data['data']['items'];
      // console.log(this.data);
      this.check = true;
      // this.count = (this.data).length;
      // this.half = this.count / 2;
      // if(this.half % 1 == 0.5){
      //   this.half = this.half + 0.5;
      // }
      // for (let index = 0; index < this.half; index++) {
      //   if (index == 0) {
      //     this.firstHalfMenue = [this.data[index]];          
      //   }else{
      //     this.firstHalfMenue.push(this.data[index]);
      //   }
      // }
      // for (let index = this.half ; index < this.count ; index++) {
      //   if (index == this.half) {
      //     this.lastHalfMenue = [this.data[index]];          
      //   }else{
      //     this.lastHalfMenue.push(this.data[index]);
      //   }
      // }
    }); 

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

  changeLanguage(lang){
    if (lang == "en") {
      sessionStorage.setItem('lang', 'ar');
    } else {
      sessionStorage.setItem('lang', 'en');
    }
    location.reload();
  }

}
