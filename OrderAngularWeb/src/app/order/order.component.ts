import { Component, OnInit,Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderDetails } from '../Models/order-details.model';
import { OrderMaster } from '../Models/order-master.model';
import { OrdersService } from '../servics/orders.service';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { ProductService } from '../servics/product.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { UserProfile } from '../Models/user-profile.model';
import { UserServicsService } from '../servics/user-servics.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  UserInforObj:UserProfile = {
    customerName : '',
    email:'',
    customerAddress:''
  };
   aProductsList= [];
   selectedProductList : OrderDetails = {
    orderDetailId:0,
    orderMasterId:0,
    productId:0,
    productName:'',
    price:0,
    quantity:0,
    totalAmount:0
   };
   theOrder:OrderMaster = {
    orderMasterId:0,
    grossValue:0,
    orderDate:new Date()
  };

  productSelected:number = 0;
  btnTxt:string="Save Order";
  headerTxt:string = "Make New Order";

  theOrderDetails : OrderDetails[] = []
  totalPrice=0;
  constructor(
    private orderService:OrdersService , private toaster:ToastrService,
    private productService:ProductService,
    public dialogRef: MatDialogRef<OrderComponent>,
    private dialog:MatDialog,
    private userService:UserServicsService,
    @Inject(MAT_DIALOG_DATA) public data
    ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getUserInformation();
   if(this.data){
    this.setDataforEdit(this.data)
   }
  }

  setDataforEdit(data){
    this.btnTxt = "Update Order";
    this.headerTxt = "Update Current Order";

    this.theOrder = data;
    this.theOrderDetails = data.orderDetails;
    for(var i=0;i<this.theOrderDetails.length;i++){
      this.theOrderDetails[i].totalAmount = this.theOrderDetails[i].quantity * this.theOrderDetails[i].price;
    }

  }

  getUserInformation(){
    this.userService.getLoginUserInformation().subscribe(
      result => {
        this.UserInforObj = result;
      },
      error => {
        console.log(error);
      },
    );

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
        this.aProductsList = response;
      },     
      error => {
        console.log(error);
      },
    );
  }

  onProductChange(event){
    var id = event.target.value;
    var product = this.aProductsList.find(a=>a.productId==id);
    this.selectedProductList.productName = product.productName;
    this.selectedProductList.productId = product.productId;
    this.selectedProductList.price = product.price;
    this.selectedProductList.quantity = 0;
  }

  productQtyChangeEvent(event){   
    let qty= event.target.value;
    this.selectedProductList.quantity = +qty;
    this.selectedProductList.totalAmount = this.selectedProductList.price*qty;   
  }

  addProductToList(){
    if(this.selectedProductList.quantity>0){      
      var aOrderItem =  this.theOrderDetails.find(a=>a.productId==this.selectedProductList.productId);
      if(aOrderItem){
        this.toaster.warning("Product already exist")
      }
      else{
        this.theOrderDetails.push(this.selectedProductList);
        //this is to reset product in select option
        this.productSelected =0;
      this.selectedProductList = {
      orderDetailId:0,
      orderMasterId:0,
      productId:0,
      productName:'',
      price:0,
      quantity:0,
      totalAmount:0
     }  
     this.updateGrossValue();
      }
     }else{
      this.toaster.warning("Please add product quantity")

     }
    
  }

  updateGrossValue(){
    this.theOrder.grossValue =   this.theOrderDetails.reduce((prev, curr) => {
      return prev + curr.totalAmount;
    }, 0);
  }
  removeProduct(index){
    this.theOrderDetails.splice(index,1);
    this.updateGrossValue();
  }
  close(){
    this.dialogRef.close();
  }

  saveOrder(){
    
    if(this.theOrder.grossValue==0){
      this.toaster.warning("Gross value should be greater then 0");
    }
    else if(this.theOrderDetails.length==0){
      this.toaster.warning("Order item required");
    }
    else{
   
      this.orderService.saveOrder(this.theOrder , this.theOrderDetails).subscribe(
        (response:any)=>{
          if(response.isSuccess==true){
            if(this.theOrder.orderMasterId > 0){
              this.toaster.success("Order Updated Successfully");
            }else{
              this.toaster.success("Order Saved Successfully");
            }       
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
