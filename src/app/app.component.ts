import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeDataComponent } from './employee-data/employee-data.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    // this.empData.getAllEmployees();
  }

  openDialog() {
    this.dialog.open(AddEmployeeComponent, {
      width:'50%',
    }).afterClosed().subscribe(val => {
      if(val === "Save")
        console.log(val);
    });
  }
}
