import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServicsService } from '../servics/user-servics.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
 
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private userServics:UserServicsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(){
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: this.comparePassword('password', 'confirmPassword')
  });

  }

      // convenience getter for easy access to form fields
      get f() { return this.registerForm.controls; }

   


    comparePassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }else{
      this.userServics.userRegistrationProcess(this.registerForm).subscribe(
        (result: any) => {  
          console.log(result); 
          if (result.isSuccess) {
            this.resetForm();
            this.toastr.success('User Created Successfully!', 'Registration successful.');
          } else {
            if(result.status=='UserExist'){
              this.toastr.success('User already exist');
            }else{
              this.toastr.success('Something went wrong..Please try again');
            }
 
          }
        },
        error => {
          console.log(error);
        }
      );

    }
}

}