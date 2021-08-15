import { Component, OnInit } from '@angular/core';
import { UserServicsService } from '../servics/user-servics.service';
import { Router } from '@angular/router';
import { UserProfile } from '../Models/user-profile.model';
import { AppHelper } from '../Helper/app-helper.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  UserInforObj:UserProfile = {
    customerName : '',
    email:'',
    customerAddress:''
  };
  currentMenu :string='';
  constructor(private service: UserServicsService,private router: Router) { }

  ngOnInit(): void {
    this.getUserInformation();

  }

  //Just to show user name in top right side of nav bar
  getUserInformation(){
    this.service.getLoginUserInformation().subscribe(
      result => {
        this.UserInforObj = result;
      },
      error => {
        console.log(error);
      },
    );

  }

  logout(){
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/']);
  }


}
