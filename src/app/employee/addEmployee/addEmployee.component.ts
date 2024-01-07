import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../employee.model';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'addemp',
    templateUrl: './addEmployee.component.html',
    styleUrls: ['./addEmployee.component.scss']
})

export class AddEmployeeComponent {
    editUserFlag!: boolean;
    id!: number;

    constructor(private datePipe: DatePipe) { }
    @Output() closeDialog = new EventEmitter<boolean>();

    @Output() employeeObj = new EventEmitter<object>();
    name = '';
    designation = '';
    age = '';
    startDate: Date | undefined ;
    endDate: Date | undefined;
    pageName: string = "Add User"

    ngOnInit(): void {

    }
    closePopup() {
        this.closeDialog.emit(false)
    }

    editUser(employee: Employee, editFlag:boolean) {
        this.editUserFlag=editFlag;
        this.pageName = "Edit User"
        this.name = employee.name;
        this.designation = employee.designation;
        this.age = employee.age.toString();
        this.id =employee.id;
        this.startDate = this.formatDate(employee.startDate);
        this.endDate = this.formatDate(employee.endDate);
    }
    addUser() {
        if (this.name && this.designation && this.age && this.startDate) {
            let obj = {
                name: this.name,
                designation: this.designation,
                age: this.age,
                startDate: this.startDate,
                id:this.id,
                endDate: this.endDate !== new Date() ? this.endDate : 'Currently working'
            }
            this.employeeObj.emit(obj);
            this.pageName = "Add User"
            this.closeDialog.emit(false);
        } else {
            alert("please enter all fields")
        }
    }
    formatDate(date: Date): any {
        return this.datePipe.transform(date, 'yyyy-MM-dd'); // Change the format as needed
    }
}