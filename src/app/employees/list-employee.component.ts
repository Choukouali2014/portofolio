import { Component, OnInit, Input } from '@angular/core';
import { IEmployees } from './IEmployees';
import { EmployeesService } from '../employees.service';
import { Router} from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  //employees: IEmployees[];
   employees: IEmployees[];
   message: boolean=false;
  constructor( private employeeService: EmployeesService, private router: Router) {
    
   }

  ngOnInit() {
    this.getEmployee();
    setInterval(()=>{
      if(Object.keys(this.employees).length === 0){
        this.getEmployee();
        location.reload();
      }
      
    }, 5000);

    //  retrieve value for message after save button
    // console.log(this.activeRoute.snapshot.paramMap.get('id'));

  }
  getEmployee() {
    this.employeeService.getEmployees().pipe(
    ).subscribe(
      (listEmployee) => {
        this.employees = listEmployee; 
        this.message =true;
        if(Object.keys(listEmployee).length === 0){
          this.message =false;
        }

      },
      (err) => {console.log( err ); this.message =false} );
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
