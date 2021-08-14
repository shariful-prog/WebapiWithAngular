import { HttpClient } from '@angular/common/http';
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
  
    var body1 = {
      ...ordermaster,
      OrderDetails: orderDetails
    };

    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(body1);
    return this.http.post(environment.baseUrl + "Order/SaveOrder", body,{'headers':headers})
  }
}




