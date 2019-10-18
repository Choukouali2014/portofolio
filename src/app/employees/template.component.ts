
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from './../employees.service';
import { IEmployees } from './IEmployees';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  oneEmployee: any = [];
constructor(private activatedRoute: ActivatedRoute, private employeesService: EmployeesService) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const empID = + params.get('id');
      if (empID) {
       this.getEmploye(empID);
      } 
    });
  }
  getEmploye(id: number) {
    this.employeesService.getEmploye(id).subscribe(
      (employee: IEmployees) => {
        this.oneEmployee = employee;
      },
      (err: any) => console.log(err)
    );
  }


}
