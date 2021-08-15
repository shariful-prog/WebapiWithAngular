import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServicsService } from '../servics/user-servics.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppHelper } from '../Helper/app-helper.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private userServics:UserServicsService,
    private toastr: ToastrService,
    private router: Router,public appHelper:AppHelper
    ) { }

  ngOnInit(): void {
    this.sessionCheck();
    this.resetForm();
    this.appHelper.currentMenu = 'login';
  }

  //checking if we find token then will redirect to dashboard
  sessionCheck(){
    if (localStorage.getItem('jwtToken') != null){
      this.router.navigateByUrl['/dashboard']
    }
  }

  resetForm(){
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }
        get f() { return this.loginForm.controls; }


  //login operation
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
  }else{
    this.userServics.userLogin(this.loginForm).subscribe(
      (result: any) => {
        localStorage.setItem('jwtToken', result.token);
        this.router.navigateByUrl('/dashboard');
      },
      error => {
        if (error.status == 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else
          console.log(error);
      }
    );
  }

  }

}
