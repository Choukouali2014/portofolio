import { AuthGuard } from './../core/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { CreateEmployeeComponent } from '../employees/create-employee.component';
import { ListEmployeeComponent } from '../employees/list-employee.component';
import { TemplateComponent } from '../employees/template.component';

const routes: Routes = [
  // parent path
  {  path: '', children: [
      { path: '',  component: ListEmployeeComponent},
      { path: 'create',  component: CreateEmployeeComponent},
      { path: 'edit/:id',  component: CreateEmployeeComponent},
      { path: 'view/:id',  component: TemplateComponent}
    ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeRoutingModule { }
