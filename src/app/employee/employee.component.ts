import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from './employee.model';
import { AddEmployeeComponent } from './addEmployee/addEmployee.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements AfterViewInit {
    @ViewChild('addempref')
    addemp!: AddEmployeeComponent;
    empData: Employee[] = [{ name: 'Siddharth', age: 23, startDate: this.formatDate(new Date('12-12-1993')), designation: 'VP', id: 1, endDate: this.formatDate(new Date()) },
    { name: 'Bhavya', age: 45, startDate: this.formatDate(new Date('12-12-1994')), designation: 'VP', id: 2, endDate: this.formatDate(new Date('12-12-2076')) }
    ];
    employees: Employee[] = JSON.parse(JSON.stringify(this.empData));
    showDialog: boolean = false;

    constructor(private cdr: ChangeDetectorRef, private datePipe: DatePipe) {

    }
    ngAfterViewInit(): void {

    }
    nameFilter = '';
    designationFilter = '';
    ageFilter = '';
    startDateFilter: Date | undefined ;
    endDateFilter: Date | undefined ;
    ngOnInit(): void {
    }

    addEmployee(employee: any): void {
    const index = this.empData.findIndex(item => item.id === employee.id);
    if (index !== -1) {
      // Object with the given ID found, update it
      this.empData[index] = { ...this.empData[index], ...employee };
    }else{
        this.empData.push(employee);
        
    }
    this.employees = JSON.parse(JSON.stringify(this.empData));
    }

    deleteEmployee(id: number): void {
        this.empData = this.empData.filter(emp => emp.id !== id);
        this.employees = JSON.parse(JSON.stringify(this.empData));
    }

    addUser() {
        this.showDialog = true;
    }
    closeDialog(val: boolean) {
        this.showDialog = val;
    }
    filteredEmployees() {
        this.employees = this.empData.filter(employee =>
            employee.name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
            employee.designation.toLowerCase().includes(this.designationFilter.toLowerCase()) &&
            employee.age.toString().includes(this.ageFilter.toLowerCase()) &&
            this.formatDate(employee.startDate)?.toString().includes(this.startDateFilter ? this.formatDate(this.startDateFilter):'') &&
            this.formatDate(employee.endDate)?.toString().includes(this.endDateFilter ?this.formatDate(this.endDateFilter):'') 
        );
    }
    clearFilters() {
        this.nameFilter = '';
        this.designationFilter = '';
        this.ageFilter = '';
        this.startDateFilter =undefined;
        this.endDateFilter = undefined;
        this.employees = this.empData;
    }
    callAddEmployee(emp: any, editFlag:boolean) {
        this.showDialog = true;
        this.cdr.detectChanges();
        this.addemp?.editUser(emp,editFlag);
    }

    formatDate(date: Date): any {
        // handling in case of user did not enter the endDate
        if(!date) {
            date = new Date()
        }
        return this.datePipe.transform(date, 'yyyy-MM-dd'); // Change the format as needed
    }
}