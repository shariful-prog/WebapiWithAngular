import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderComponent } from '../order/order.component';
import { OrdersService } from '../servics/orders.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orderList;
  constructor(private router: Router,
    private orderService:OrdersService,
    private dialog:MatDialog) { }

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


  AddNewOrder(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;   
    dialogConfig.width = "80%"
    this.dialog.open(OrderComponent,dialogConfig).afterClosed().subscribe(res => {
     this.getOrders();
    });
  }

}
