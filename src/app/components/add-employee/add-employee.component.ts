import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employee: any = {};

  constructor(private dataService: DataService, private router: Router) { }

  submitForm() {
    this.dataService.addEmployee(this.employee).subscribe(() => {
      this.router.navigate(['/']);  // Redirect to employee list after adding
    });
  }
}
