import { Component, OnInit } from '@angular/core';
import { AppHelper } from './Helper/app-helper.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'OrderAngularWeb';
  current:string = '';
  constructor(public apphelper:AppHelper){
  }

  
  ngOnInit(): void {
   debugger;
    this.current = this.apphelper.currentMenu;
    console.log(this.current)
   }
  
}
