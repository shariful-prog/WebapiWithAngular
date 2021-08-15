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
  //showing totalorder count and order value in view
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


  //for getting order by customer
  getOrders(){
    this.orderService.getCustomerOrders().subscribe(
      (response:any)=>{    
        this.orderList = response ;
        this.totalOrderCount = this.orderList.length;
        //this will give total sum of order amount
        this.totalOrderValue = this.orderList.reduce((accum,item) => accum + item.grossValue, 0)

      }
      ,
      err => {
        console.log(err);
      },
    );
  }

//I have used matdialog for dialog
  AddNewOrder(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;   
    dialogConfig.width = "80%"
    // this will open up a dialog that will open up with orderComponent
    //after the dialog close i have loaded the lastest order to show
    this.dialog.open(OrderComponent,dialogConfig).afterClosed().subscribe(() => {
     this.getOrders();
    });
  }


  //Just or deleting purpose only
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


  getSelectedOrder(id){
    
    this.orderService.getSelectedOrder(id).subscribe(
      (response:any)=>{
        
        const dialogConfig= new MatDialogConfig();
        dialogConfig.autoFocus=true;
        dialogConfig.disableClose=true;
        
        dialogConfig.width = "80%"
        dialogConfig.data = response
        this.dialog.open(OrderComponent,dialogConfig);
      }
      ,
      err => {
        console.log(err);
      },
    );
  }

}
