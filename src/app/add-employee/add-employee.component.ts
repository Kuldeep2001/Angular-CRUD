import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  Marital_status:any = [
    {val:'single', desc:'Unmarried'},
    {val:'married', desc:'Married'},
    {val:'divorced', desc:'Divorced'},
    {val:'separated', desc:'Separated'}
  ];
  Employee_Options:any = [
    {val:'high_school', desc:'High School Degree'},
    {val:'bachelors', desc:'Bachelor Degree'},
    {val:'masters', desc:'Master Degree'},
    {val:'post_graduates', desc:'PhD'}
  ];

  employeeForm !: FormGroup;
  constructor(private formBuilder:FormBuilder,
              private http:HttpClient,
              private employeeService:EmployeeService,
              @Inject (MAT_DIALOG_DATA) public editData:any,
              private dialogRef:MatDialogRef<AddEmployeeComponent>) {
    this.employeeForm = formBuilder.group({});
    this.employees = [];
    this.employeesToDisplay = this.employees;
  }

  actionBtn = 'Add';
  // @ViewChild('fileInput') fileInput:any;
  employees:Employee[] = [];
  employeesToDisplay:Employee[] = [];

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      avatar:['',Validators.required],
      date:['',Validators.required],
      gender:['',Validators.required],
      maritalStatus:['',Validators.required],
      // maritalStatus:this.formBuilder.control(''),
      education:['',Validators.required],
      university:['',Validators.required],
      company:['',Validators.required],
      experience:['',Validators.required],
      ctc:['',Validators.required]
    });
    if(this.editData)
    {
      this.actionBtn = 'Update';
      this.employeeForm.controls['firstname'].setValue(this.editData.firstname);
      this.employeeForm.controls['lastname'].setValue(this.editData.lastname);
      this.employeeForm.controls['avatar'].setValue(this.editData.avatar);
      this.employeeForm.controls['date'].setValue(this.editData.date);
      this.employeeForm.controls['gender'].setValue(this.editData.gender);
      this.employeeForm.controls['maritalStatus'].setValue(this.editData.maritalStatus);
      this.employeeForm.controls['education'].setValue(this.editData.education);
      this.employeeForm.controls['university'].setValue(this.editData.university);
      this.employeeForm.controls['company'].setValue(this.editData.company);
      this.employeeForm.controls['experience'].setValue(this.editData.experience);
      this.employeeForm.controls['ctc'].setValue(this.editData.ctc);
    }
  }

  onFileSelect(e:any){
    if(e.target.files)
    {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (even:any) =>{
        this.employeeForm.controls['avatar'].setValue(even.target.result);
      }
    }
  }
  addEmployee() {
    // this.fileInput.nativeElement.files[0]?.name;
    if(!this.editData && this.employeeForm.valid)
    {
      this.employeeService.postEmployee(this.employeeForm.value)
      .subscribe({
        next:(res)=>{
          alert('Employee Added Successfully');
          this.employeeForm.reset();
          this.dialogRef.close('Save');
        },
        error:()=>{
          alert('Error while adding Employee!!');
        }
      })
    }
    else if(this.editData && this.employeeForm.valid)
    {
      this.updateEmployee();
    }
    else
    {
      alert('Fill all the mandatory fields');
    }
  }

  updateEmployee(){
    this.employeeService.putEmployee(this.employeeForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Data updated successfully");
        this.employeeForm.reset();
        this.dialogRef.close('Update');
      },
      error:(res)=>{
        alert('Faced an issue while updating data.\nPlease try again later');
        this.employeeForm.reset();
        this.dialogRef.close('Close');
      }
    })
  }

  closeDialog(){
    alert('Closing Edit Employee Modal');
    this.employeeForm.reset();
    this.dialogRef.close('Close');
  }
}