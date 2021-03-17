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

  constructor(private myOrdersService:MyOrdersService) {
    this.myOrdersService.getOrders().subscribe(data => {
      this.orders = data['data'];
      console.log(this.orders);
    });
  }

  ngOnInit() {
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
