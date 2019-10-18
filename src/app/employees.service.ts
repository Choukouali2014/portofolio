import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { IEmployees } from './employees/IEmployees';
import { AuthService } from './core/auth.service';
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient, private firestore: AngularFirestore, private auth: AuthService) { }
  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    )
  };
  baseUrl = 'http://localhost:3000/employees';
  employees = this.firestore.collection('employees');
  

  getEmployees(): Observable<IEmployees[]> {
    this.employees
    .get().subscribe((snapshot)=>{
      console.log('the value is : ', snapshot);
      snapshot.forEach((doc)=> {
        if(doc.id !== ''){
          console.log(doc.id, " => ", doc.data());
        }
        // doc.data() is never undefined for query doc snapshots
        
    });
    });
    return this.http.get<IEmployees[]>(this.baseUrl).
      pipe(catchError(this.handleError));
    // return this.firestore.doc<IEmployees[]>(`employees/${user.uid}`).valueChanges() : of(null);
  }

  getEmploye(id: number): Observable<IEmployees> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IEmployees>(url).pipe(
      catchError(this.handleError)
    );

  }
  addEmployee(employee: IEmployees): Observable<IEmployees> {
    this.employees.add(employee).catch(this.handleError);
    return this.http.post<IEmployees>(this.baseUrl, employee, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteEmployee(id: number): Observable<IEmployees> {

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<IEmployees>(url, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateEmployee(employee: IEmployees): Observable<any> {
    const url = `${this.baseUrl}/${employee.id}`;
    return this.http.put(url, employee, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}
