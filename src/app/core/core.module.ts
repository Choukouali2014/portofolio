import { SharedModule } from './../shared/shared.module';

import { AuthService } from './auth.service';
import { CoreRoutingModule } from './core-routing.module';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule  } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EmailVerifComponent } from './email-verif/email-verif.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@NgModule({
  declarations: [UserProfileComponent, EmailVerifComponent, RegisterComponent, ForgetPasswordComponent],
  imports: [
    AngularFireAuthModule,
    SharedModule,
    CoreRoutingModule,
    AngularFirestoreModule
  ],
  providers: [AuthService]
})
export class CoreModule { }
