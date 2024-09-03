import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee: any = {};

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null; // Convert to number or use null as fallback
    if (id !== null) {
      this.dataService.getEmployee(id).subscribe(data => {
        this.employee = data;
      });
    }
  }

  submitForm() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null; // Convert to number or use null as fallback
    if (id !== null) {
      this.dataService.updateEmployee(id, this.employee).subscribe(() => {
        this.router.navigate(['/']);  // Redirect to employee list after updating
      });
    }
  }
}
