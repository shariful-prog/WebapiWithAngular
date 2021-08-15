import { Component, OnInit,Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderDetails } from '../Models/order-details.model';
import { OrderMaster } from '../Models/order-master.model';
import { OrdersService } from '../servics/orders.service';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { ProductService } from '../servics/product.service';
import { SpinnerComponent } from '../spinner/spinner.component';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
   procuctList= [];
   selectedProduct : OrderDetails = {
    OrderDetailId:0,
    OrderMasterId:0,
    ProductId:0,
    ProductName:'',
    Price:0,
    Quantity:0,
    TotalAmount:0
   };
   theOrder:OrderMaster = {
    OrderMasterId:0,
    GrossValue:0
  };

  currentDate = new Date();

  theOrderDetails : OrderDetails[] = []
  totalPrice=0;
  constructor(
    private orderService:OrdersService , private toaster:ToastrService,
    private productService:ProductService,
    public dialogRef: MatDialogRef<OrderComponent>,
    private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data
    ) { }

  ngOnInit(): void {
    this.getProducts();
    // this.testF();
  }

  testF(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;   
    dialogConfig.width = "80%"
    this.dialog.open(SpinnerComponent,dialogConfig);
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      (response:any)=>{

        this.procuctList = response;
      },
      
      err => {
        console.log(err);
      },
    );
  }

  onProductChange(event){
    debugger;
    var id = event.target.value;
    var product = this.procuctList.find(a=>a.productId==id);
    this.selectedProduct.ProductName = product.productName;
    this.selectedProduct.ProductId = product.productId;
    this.selectedProduct.Price = product.price;
    this.selectedProduct.Quantity = 0;
  }

  applyQty(event){   
    let qty= event.target.value;
    this.selectedProduct.Quantity = +qty;
    this.selectedProduct.TotalAmount = this.selectedProduct.Price*qty;
    
  }

  addProductToList(){
    if(this.selectedProduct.Quantity>0){

      
      var aOrderItem =  this.theOrderDetails.find(a=>a.ProductId==this.selectedProduct.ProductId);
      if(aOrderItem){
        aOrderItem.Quantity = aOrderItem.Quantity+this.selectedProduct.Quantity;
        aOrderItem.TotalAmount = aOrderItem.TotalAmount+this.selectedProduct.TotalAmount;
      }
      else{
        this.theOrderDetails.push(this.selectedProduct);
      }
      

      
      this.theOrder.GrossValue += this.selectedProduct.TotalAmount;
      this.updateTotal();
     }
     
     // resetting  selected product list
     this.selectedProduct = {
      OrderDetailId:0,
      OrderMasterId:0,
      ProductId:0,
      ProductName:'',
      Price:0,
      Quantity:0,
      TotalAmount:0

     }

  }

  updateTotal(){
    this.theOrder.GrossValue =   this.theOrderDetails.reduce((prev, curr) => {
      return prev + curr.TotalAmount;
    }, 0);
  }
  removeItem(product , index){
    this.theOrderDetails.splice(index,1);
    this.updateTotal();
  }
  close(){
    this.dialogRef.close();
  }

  saveOrder(){
    
    if(this.theOrder.GrossValue==0){
      this.toaster.warning("Order amount cannot be 0");
    }
    else if(this.theOrderDetails.length==0){
      this.toaster.warning("Order item required");
    }
    else{
   
      this.orderService.saveOrder(this.theOrder , this.theOrderDetails).subscribe(
        (response:any)=>{
          if(response.isSuccess==true){
            this.toaster.success("Order Saved Successfully");
            this.dialogRef.close();
          }else{
            this.toaster.warning("Something went wrong");
          }
        },    
        err => {
          console.log(err);
          this.toaster.warning("Something went wrong");
        },
  
      );
    }

    
  }

}
