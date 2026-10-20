"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const User_1 = require("./User");
class Employee extends User_1.User {
    salary;
    department;
    constructor(id, name, email, salary, department) {
        super(id, name, email, "EMPLOYEE");
        this.validateSalary(salary);
        this.validateDepartment(department);
        this.salary = salary;
        this.department = department.trim();
    }
    getSalary() {
        return this.salary;
    }
    getDepartment() {
        return this.department;
    }
    updateSalary(salary) {
        this.validateSalary(salary);
        this.salary = salary;
    }
    updateDepartment(department) {
        this.validateDepartment(department);
        this.department = department.trim();
    }
    getSummary() {
        return `${super.getSummary()} | Department: ${this.department} | Salary: ${this.salary.toFixed(2)}`;
    }
    validateSalary(salary) {
        if (typeof salary !== "number" || !Number.isFinite(salary) || salary <= 0) {
            throw new Error("Salary must be a finite number greater than zero.");
        }
    }
    validateDepartment(department) {
        if (typeof department !== "string" || department.trim().length === 0) {
            throw new Error("Department cannot be empty.");
        }
    }
}
exports.Employee = Employee;
