import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: any[] = [];  // Array to hold the list of employees
  editingEmployee: any = {};  // Object to hold the employee being edited
  isEditing: boolean = false;  // Flag to indicate if editing

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadEmployees();  // Load employees when the component initializes
  }

  loadEmployees() {
    this.dataService.getData().subscribe((data: any[]) => {
      this.employees = data;
    });
  }

  submitForm() {
    if (this.isEditing) {
      // Update employee if in edit mode
      this.dataService.updateEmployee(this.editingEmployee.id, this.editingEmployee).subscribe({
        next: () => {
          this.loadEmployees();  // Reload the employee list after updating
          this.clearForm();      // Clear the form after submission
        },
        error: (err) => {
          console.error('Update failed', err);
        }
      });
    } else {
      // Add new employee
      this.dataService.addEmployee(this.editingEmployee).subscribe({
        next: () => {
          this.loadEmployees();  // Reload the employee list after adding a new one
          this.clearForm();      // Clear the form after submission
        },
        error: (err) => {
          console.error('Add failed', err);
        }
      });
    }
  }
  

  deleteEmployee(id: number) {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.dataService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees();  // Reload the employee list after deletion
      });
    }
  }

  editEmployee(emp: any) {
    this.editingEmployee = { ...emp };  // Copy employee data to editingEmployee
    this.isEditing = true;  // Set editing mode
  }

  clearForm() {
    this.editingEmployee = {};  // Clear the editing mode and form data
    this.isEditing = false;
  }
}
