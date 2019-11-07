import { AuthService } from './../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { CustomValidator } from '../shared/custom.validator';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from '../employees.service';
import { ESkills } from './ESkills';
import { IEducation } from '../education/IEducation';
import { IExperience } from '../experience/IExperience';
import { formErrors } from './../data';
import { Router } from '@angular/router';
import { IEmployees } from './IEmployees';


@Component({ 
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private employeesService: EmployeesService
  ) { }
  employeeForm;
  message: string;
  pageTitle: string;
  Iemployee: IEmployees;
  formErrors = formErrors;
  customV = CustomValidator;
 
  // validationMessage = validationMessage;
  ngOnInit() {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(14)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(14)]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      state: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: [''],
      contactPreference: ['email'],
      skills: this.fb.array([
        this.addSkillForm()
      ]),
      education: this.fb.array([
        this.addEducationForm()
      ]),
      experience: this.fb.array([
       this.addExperienceForm()
      ])
    });
    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPreference(data);
    });
    // switching between update and register ( update has a parameter and does not have)
    // activatedRoute help you to take every parameter in our route)
    this.activatedRoute.paramMap.subscribe(params => {
      const empID = + params.get('id');
      if (empID) {
        this.pageTitle = 'Edit Resume';
        this.getEmploye(empID);
      } else {
        this.pageTitle = 'Create Resume';
        // initialize our employee constructor
        this.Iemployee = {
          id: null,
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          zip: '',
          state: '',
          phone: null,
          contactPreference: '',
          skills: [],
          education: [],
          experience: []
        };
      }
    });

   
  }
  getEmploye(id: number) {
    this.employeesService.getEmploye(id).subscribe(
      (employee: IEmployees) => {
        this.editEmployee(employee);
        this.Iemployee = employee;
      },
      (err: any) => console.log(err)
    );
  }
  ShowErrors(){
    this.customV.logValidationErrors(this.employeeForm);
  }

  // load existant employee
  editEmployee(employee: IEmployees) {
    this.employeeForm.patchValue({
      contactPreference: employee.contactPreference,
      email: employee.email,
          firstName: employee.firstName,
          lastName: employee.lastName,
          address: employee.address,
          city: employee.city,
          zip: employee.zip,
          state: employee.state,
      phone: employee.phone
    });
    // Loading the form array skills
    this.employeeForm.setControl('skills', this.setExistingSkills(employee.skills));
    this.employeeForm.setControl('education', this.setExistingEducation(employee.education));
    this.employeeForm.setControl('experience', this.setExistingExperience(employee.experience));
  }
  setExistingSkills(skillSets: ESkills[]): FormArray {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(
        this.fb.group({
          skillName: s.skillName,
          experience: s.experience,
          proficiency: s.proficiency
        })
      );
    });
    return formArray;
  }
  setExistingEducation(educationSets: IEducation[]): FormArray {
    const formArray = new FormArray([]);
    educationSets.forEach(e => {
      formArray.push(
        this.fb.group({
          educationName: e.educationName,
          degree: e.degree,
          gpa: e.gpa,
          endDate: e.endDate,
          startDate: e.startDate
        })
      );
    });
    return formArray;
  }
  setExistingExperience(experienceSets: IExperience[]  ): FormArray {
    const formArray = new FormArray([]);
    experienceSets.forEach(e => {
      formArray.push(
        this.fb.group({
          jobTitle: e.jobTitle,
          jobDescription: e.jobDescription,
          company: e.company,
          present: e.present,
          endDate: e.endDate,
          startDate: e.startDate
        })
      );
    });
    return formArray;
  }
  addSkillForm(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experience: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }
  addEducationForm(): FormGroup {
    return this.fb.group({
      educationName: ['', Validators.required],
      degree: ['', Validators.required],
      gpa: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }
  addExperienceForm(): FormGroup {
    return this.fb.group({
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      jobDescription: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      present: ['']
    });
  }
  deleteSkill(index: number): void {
    const skillsFormArry = (this.employeeForm.get('skills') as FormArray);
    skillsFormArry.removeAt(index);
    skillsFormArry.markAsDirty();
    skillsFormArry.markAsTouched();
  }

  deleteEducation(index: number) {
    const skillsFormArry = (this.employeeForm.get('education') as FormArray);
    skillsFormArry.removeAt(index);
    skillsFormArry.markAsDirty();
    skillsFormArry.markAsTouched();
  }
  deleteExperience(index: number) {
    const skillsFormArry = (this.employeeForm.get('experience') as FormArray);
    skillsFormArry.removeAt(index);
    skillsFormArry.markAsDirty();
    skillsFormArry.markAsTouched();
  }

  onSubmit(): void {
    this.mapFormValuesToEmployeModel();
    if (this.Iemployee.id) {
      this.employeesService.updateEmployee(this.Iemployee).subscribe(
        () => {
          this.message = 'Updated successful';
          setTimeout(() => {
            this.route.navigate(['employees', { message: true }]).then(nav => {
              console.log(nav);
            }, err => {
              console.log(err);
            }
            );
          }, 3000);
        },
        (err: any) => console.log(err)
      );
    } else {
      this.employeesService.addEmployee(this.Iemployee).subscribe(
        () => {
          this.message = 'Created successful';
          setTimeout(() => {
            this.route.navigate(['employees']).then(nav => {
              console.log(nav);
            }, err => {
              console.log(err);
            }
            );
          }, 3000);
        },
        (err: any) => console.log(err)
      );
    }
    // this.route.navigate(['employees']);
  }
  mapFormValuesToEmployeModel() {
    this.Iemployee.city = this.employeeForm.value.city;
    this.Iemployee.address = this.employeeForm.value.address;
    this.Iemployee.firstName = this.employeeForm.value.firstName;
    this.Iemployee.lastName = this.employeeForm.value.lastName;
    this.Iemployee.zip = this.employeeForm.value.zip;
    this.Iemployee.state = this.employeeForm.value.state;
    this.Iemployee.email = this.employeeForm.value.email;
    this.Iemployee.phone = this.employeeForm.value.phone;
    this.Iemployee.contactPreference = this.employeeForm.value.contactPreference;
    this.Iemployee.skills = this.employeeForm.value.skills;
    this.Iemployee.education = this.employeeForm.value.education;
    this.Iemployee.experience = this.employeeForm.value.experience;
    this.Iemployee.uid = !!this.auth.uid() ? this.auth.uid() : '';
  }
  addSkillButton(): void {
    (this.employeeForm.get('skills') as FormArray).push(this.addSkillForm());
  }
  addEducationButton(): void {
    (this.employeeForm.get('education') as FormArray).push(this.addEducationForm());
  }
  addExperienceButton(): void {
    (this.employeeForm.get('experience') as FormArray).push(this.addExperienceForm());
  }
 
  onContactPreference(selectValue: string) {
    const phoneControl = this.employeeForm.get('phone');
    if (selectValue === 'phone') {
      phoneControl.setValidators([Validators.required]);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
