import { Component, OnInit } from '@angular/core';
import { UserServicsService } from '../servics/user-servics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  UserInforObj;
  constructor(private service: UserServicsService,private router: Router) { }

  ngOnInit(): void {
    this.getUserInformation();
  }

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
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }


}
