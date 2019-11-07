
import { formErrors } from './../../data';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidator } from '../../shared/custom.validator';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from './../User';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  signIn: FormGroup;
  user: User;
  message;
 errors;
  formErrors = formErrors;
  custom = CustomValidator;
  constructor( public auth: AuthService, private router: Router , private fb: FormBuilder) {

   }

  ngOnInit() {
    this.signIn = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });
  }
  ShowErrors() {
    this.custom.logValidationErrors(this.signIn);
  }
  register() {
    this.router.navigate(['/auth/register']);
  }
  onSubmit() {
    const error =  this.auth.signIn(this.signIn.value.email, this.signIn.value.password);
    this.errors = error;
    console.log( error);
    
   
    // result.catch((error) => {
    //   this.message = false;
    //   this.errors= error.message;
    //   console.log('the error is 1 : ', error.message);
    //   });
  }
  mapFormValuesToUSer() {
    this.user.email = this.signIn.value.email;
    this.user.password = this.signIn.value.password;
  }

}
