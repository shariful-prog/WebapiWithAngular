import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

// This is for product http request 
export class ProductService {

  constructor(private http:HttpClient) { }

  
  getProducts(){
    return this.http.get(environment.baseUrl+"Product");
  }

  saveProduct(formGroup){ 
    var body = {
      ProductName:formGroup.Name,
      Price:formGroup.Price,
    };
    return this.http.post(environment.baseUrl + "Product", body);
  }

  deleteProduct(id){
    let params = new HttpParams().set("productId",id)
    return this.http.delete(environment.baseUrl + "Product", { params:params})
  }

}
