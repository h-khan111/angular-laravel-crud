import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This makes the service available throughout the app
})
export class DataService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private httpClient: HttpClient) { }

  // Fetch all employees
  getData(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/employees`);
  }

  // Add a new employee
  addEmployee(employee: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/addEmployee`, employee);
  }

  // Update an existing employee by ID
  updateEmployee(id: number, employee: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/updateEmployee/${id}`, employee);
  }
  // Get employee by ID
getEmployee(id: number): Observable<any> {
  return this.httpClient.get<any>(`${this.apiUrl}/employees/${id}`);
}

  

  // Delete an employee by ID
  deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/deleteEmployee/${id}`);
  }
}
