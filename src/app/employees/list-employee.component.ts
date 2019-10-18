import { Component, OnInit, Input } from '@angular/core';
import { IEmployees } from './IEmployees';
import { EmployeesService } from '../employees.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  //employees: IEmployees[];
  @Input() employees: IEmployees[];
  constructor( private employeeService: EmployeesService, private router: Router) { }

  ngOnInit() {
    this.getEmployee();

    //  retrieve value for message after save button
    // console.log(this.activeRoute.snapshot.paramMap.get('id'));

  }
  getEmployee() {
    this.employeeService.getEmployees().subscribe(
      (listEmployee) => this.employees = listEmployee,
      (err) => console.log( err ) );
  }

  editButton(employeeID: number) {
      this.router.navigate(['employees/edit', employeeID]);
  }
  viewButton(employeeID: number) {
      this.router.navigate(['employees/view', employeeID]);
  }
  deleteEmploy(id: number) {
      this.employeeService.deleteEmployee(id).subscribe(
        () => {
          this.getEmployee();
        },
        (err: any) => console.log(err + '2')
      );
  }


}
