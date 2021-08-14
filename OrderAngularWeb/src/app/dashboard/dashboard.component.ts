import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../servics/orders.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orderList;
  constructor(private router: Router,private orderService:OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }


  getOrders(){
    this.orderService.getCustomerOrders().subscribe(
      (response:any)=>{    
        console.log(response);  
        this.orderList = response ;
      }
      ,
      err => {
        console.log(err);
      },
    );
  }

}
