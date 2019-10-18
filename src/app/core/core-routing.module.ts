import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
  // parent path
  {  path: '', children: [
      { path: '',  component: UserProfileComponent},
      { path:'register', component: RegisterComponent}
    ]}

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class CoreRoutingModule { }
