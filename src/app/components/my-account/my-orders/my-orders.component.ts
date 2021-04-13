import { Component, OnInit } from '@angular/core';
import { MyOrdersService } from './my-orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders:any;
  response:any;

  myOrdersStatus:boolean = false;
  isOn:boolean = false;

  lang:string;
  constructor(private myOrdersService:MyOrdersService) {
    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
    this.myOrdersService.lang = this.lang;
    this.myOrdersService.getOrders().subscribe(data => {
      this.orders = data['data'];
      console.log(this.orders);

      this.myOrdersStatus = true;
      this.checkIsOn();

    });
  }

  ngOnInit() {
  }

  checkIsOn(){
    if(this.myOrdersStatus){
      this.isOn = true;
    }
  }

  cancel(id){
    this.myOrdersService.cancelUrl = "http://localhost:8000/api/order/"+ id +"/cancel"; 
    this.myOrdersService.cancelOrders().subscribe(response => {
      this.response = response;
      this.myOrdersService.getOrders().subscribe(data => {
        this.orders = data['data'];
        console.log(this.orders);
      });
    });
  }

}
