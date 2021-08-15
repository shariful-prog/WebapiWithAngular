import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderComponent } from '../order/order.component';
import { OrdersService } from '../servics/orders.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orderList;
  totalOrderCount:number = 0;
  totalOrderValue:number = 0;
  constructor(private router: Router,
    private orderService:OrdersService,
    private dialog:MatDialog,
    private toaster:ToastrService
    ) { }

  ngOnInit(): void {
    this.getOrders();
  }


  getOrders(){
    this.orderService.getCustomerOrders().subscribe(
      (response:any)=>{    
        this.orderList = response ;
        this.totalOrderCount = this.orderList.length;
        this.totalOrderValue = this.orderList.reduce((accum,item) => accum + item.grossValue, 0)

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


  deleteOrder(id){
    this.orderService.deleteOrder(id).subscribe(
      (response:any)=>{    
        if(response.isSuccess){
        this.toaster.success("Delete Successfull");
        this.getOrders();
        }else{
            this.toaster.error("Something went wrong")
        }
      }
      ,
      err => {
        console.log(err);
        this.toaster.error("Something went wrong")
      },
    );

    
    
  }

}
