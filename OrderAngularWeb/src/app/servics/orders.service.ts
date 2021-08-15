import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }


  getCustomerOrders(){
    return this.http.get(environment.baseUrl+"Order/GetOrders");
  }

  saveOrder(ordermaster , orderDetails){
  
    var OrderData = {
      ...ordermaster,
      OrderDetails: orderDetails
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(OrderData);

    if(ordermaster.orderMasterId > 0){
      return this.http.post(environment.baseUrl + "Order/UpdateOrder", body,{'headers':headers})

    }else{
    return this.http.post(environment.baseUrl + "Order/SaveOrder", body,{'headers':headers})

    }

  }

  deleteOrder(id){
    let params = new HttpParams().set("orderId",id)
    return this.http.delete(environment.baseUrl + "Order/DeleteOrder", { params:params})
  }
  getSelectedOrder(id){
    let params = new HttpParams().set("orderId",id)
    return this.http.get(environment.baseUrl + "Order/GetSingleOrder", { params:params})

  }
}




