import { Component, OnInit } from '@angular/core';
import { FooterService } from "../footer/footer.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  data:any;
  check:boolean = false;
  lang:string;
  constructor( private footerService:FooterService ) {
    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
    this.footerService.lang = this.lang;
    this.footerService.getFooter().subscribe(data => {
      this.data = data;
      this.check = true;
      console.log(this.data);
    });
  }

  ngOnInit() {
  }

}
