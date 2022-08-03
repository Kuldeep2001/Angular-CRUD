import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = "http://localhost:3000/employeeList/";

  constructor(private http:HttpClient) { }

  getEmployees(){
    return this.http.get<Employee[]>(this.baseUrl);
  }

  postEmployee(employee:Employee){
    return this.http.post<Employee>(this.baseUrl, employee);
  }

  putEmployee(employee:Employee, id:number)
  {
    return this.http.put<Employee>(this.baseUrl+id, employee);
  }
  deleteEmployee(id:number){
    return this.http.delete(this.baseUrl+id);
  }
}
