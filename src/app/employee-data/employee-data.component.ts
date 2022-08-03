import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css']
})
export class EmployeeDataComponent implements OnInit {
  // @ViewChild('fileInput') fileInput:any;

  displayedColumns: string[] = ['firstname', 'lastname', 'avatar', 'date', 'gender', 'maritalStatus', 'education', 'university', 'company', 'experience', 'ctc', 'action'];
  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService:EmployeeService, private dialog: MatDialog){}
  ngOnInit(): void {
    this.getAllEmployees();
  }

  editEmployee(row:any){
    console.log(row);
    this.dialog.open(AddEmployeeComponent, {
      width:'50%',
      data:row
    }).afterClosed().subscribe(val => {
      if(val === "Update")
        this.getAllEmployees();
    });
  }

  deleteEmployee(id:number)
  {
    this.employeeService.deleteEmployee(id)
    .subscribe({
      next:(res)=>{
        alert('Employee details deleted successfully');
        this.getAllEmployees();
      },
      error:(res)=>{
        alert('Faced an issue while deleting the details');
      }
    })
  }

  getAllEmployees(){
    this.employeeService.getEmployees()
    .subscribe({
      next:(res)=>{
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(res)=>{
        alert('Error while fetching Employees data');
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
