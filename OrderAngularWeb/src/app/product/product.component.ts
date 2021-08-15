import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../servics/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(    private productService:ProductService , 
    private fb:FormBuilder, 
    private toaster:ToastrService ) { }


    procuctList ;
    formModel:FormGroup;
    ngOnInit(): void {
      this.resetForm();
      this.getAllProducts();
    }

    resetForm(){
      this.formModel = this.fb.group({
        Name: ['', Validators.required],
        Price: ['', Validators.required, ],
      });
    }

    // getting all products that already been saved

    getAllProducts(){
      this.productService.getProducts().subscribe(
        (response:any)=>{      
          console.log(response);   
          this.procuctList = response;
        },      
        err => {
          console.log(err);
        }
      );
    }

        //  product Save function 
    saveProduct(){
  
      this.productService.saveProduct(this.formModel.value).subscribe(
        (response:any)=>{
          console.log(response);
          if(response.productId>0){
            this.toaster.success("Product Added Successfully");
            this.getAllProducts();
            this.resetForm();
          }
        },
        err => {
          console.log(err);
        }
      );
    }

    // deleting products 

    deleteOrder(id){
      this.productService.deleteProduct(id).subscribe(
        (response:any)=>{    
          if(response.isSuccess){
          this.toaster.success("Delete Successfull");
          this.getAllProducts();
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
