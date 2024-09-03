<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;

class EmployeeController extends Controller
{
    // Fetch all employees
    public function getEmployee(){
        return response()->json(Employee::all(), 200); 
    }
    
    // Fetch a specific employee by ID
    public function getEmployeeById($id){
        $employee = Employee::find($id);
        if (is_null($employee)) {
            return response()->json(['message' => 'Employee Not Found'], 404);
        }
        return response()->json($employee, 200);
    }
    
    // Add a new employee
    public function addEmployee(Request $request){
        // Validate incoming request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:employees',
            'salary' => 'required|numeric'
        ]);

        $employee = Employee::create($request->only(['name', 'email', 'salary']));
        return response()->json($employee, 201); 
    }
    
    // Update an existing employee by ID
    public function updateEmployee(Request $request, $id){
        $employee = Employee::find($id);
        if (is_null($employee)) {
            return response()->json(['message' => 'Employee Not Found'], 404);
        }
        
        // Validate incoming request
        $request->validate([
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:employees,email,' . $id,
            'salary' => 'numeric'
        ]);

        // Update only the specified fields: name, email, and salary
        $employee->update($request->only(['name', 'email', 'salary']));
        return response()->json($employee, 200);
    }
    
    // Delete an employee by ID
    public function deleteEmployee($id){
        $employee = Employee::find($id);
        if (is_null($employee)) {
            return response()->json(['message' => 'Employee Not Found'], 404);
        }
        
        // Delete the employee record
        $employee->delete();
        return response()->json(['message' => 'Employee Deleted Successfully'], 200);
    }
}
