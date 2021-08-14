import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../Models/user-profile.model';
@Injectable({
  providedIn: 'root'
})
export class UserServicsService {

  constructor(private http:HttpClient) {

   }

   userRegistrationProcess(formGroup){
    var body = {
      Username: formGroup.value.userName,
      Name: formGroup.value.userName,
      Email: formGroup.value.email,
      Address: formGroup.value.address,
      Password: formGroup.value.password
    };
    return this.http.post(environment.baseUrl + 'Authenticate', body);
   }


   userLogin(formGroup){
     var body = {
      UserName : formGroup.value.userName,
      Password : formGroup.value.password
     }
     return this.http.post(environment.baseUrl + 'Authenticate/login', body);

   }

   getLoginUserInformation(){
    return this.http.get<UserProfile>(environment.baseUrl +'Authenticate/GetUserInfo')
  }
}
