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
  constructor( private footerService:FooterService ) { 
    this.footerService.getFooter().subscribe(data => {
      this.data = data;
      this.check = true;
      console.log(this.data);
    });
  }

  ngOnInit() {
  }

}
