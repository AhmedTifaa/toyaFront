import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { sliderService } from './slider.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  width = window.innerWidth < 449 ? 449: window.innerWidth;
  height = (Math.ceil(this.width * (33.333 / 100))) < 333 ? 333 : (Math.ceil(this.width * (33.333 / 100)));
  data:any;
  lang:string;
  constructor(private sliderService:sliderService) { 
    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
    this.sliderService.lang = this.lang;
    this.sliderService.getSlider().subscribe(data=>{
      this.data = data["data"];
      console.log(data);
    });
  }

  ngOnInit() {
    
  }
  onResize(event){
    
  }
}
