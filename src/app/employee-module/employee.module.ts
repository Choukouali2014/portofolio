
import { NgModule } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { EmployeRoutingModule } from './employe-routing.module';
import { CreateEmployeeComponent } from '../employees/create-employee.component';
import { ListEmployeeComponent } from '../employees/list-employee.component';
import { SharedModule } from '../shared/shared.module';
import { EducationComponent } from '../education/education.component';
import { ExperienceComponent } from '../experience/experience.component';
import { InterestComponent } from '../experience/interest.component';
import { TemplateComponent } from '../employees/template.component';

@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ListEmployeeComponent,
    EducationComponent,
    ExperienceComponent,
    InterestComponent,
    TemplateComponent
  ],
  imports: [
    EmployeRoutingModule,
    SharedModule
  ],
  providers: [EmployeesService]
  // exports: [
  //   CreateEmployeeComponent,
  //   ReactiveFormsModule
  // ]
})
export class EmployeeModule { }
