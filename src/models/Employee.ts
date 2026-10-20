import { User } from "./User";

export class Employee extends User {
  public salary: number;
  private department: string;

  public constructor(
    id: number,
    name: string,
    email: string,
    salary: number,
    department: string
  ) {
    super(id, name, email, "EMPLOYEE");
    this.validateSalary(salary);
    this.validateDepartment(department);
    this.salary = salary;
    this.department = department.trim();
  }

  public getSalary(): number {
    return this.salary;
  }

  public getDepartment(): string {
    return this.department;
  }

  public updateSalary(salary: number): void {
    this.validateSalary(salary);
    this.salary = salary;
  }

  public updateDepartment(department: string): void {
    this.validateDepartment(department);
    this.department = department.trim();
  }

  public override getSummary(): string {
    return `${super.getSummary()} | Department: ${this.department} | Salary: ${this.salary.toFixed(2)}`;
  }

  private validateSalary(salary: number): void {
    if (typeof salary !== "number" || !Number.isFinite(salary) || salary <= 0) {
      throw new Error("Salary must be a finite number greater than zero.");
    }
  }

  private validateDepartment(department: string): void {
    if (typeof department !== "string" || department.trim().length === 0) {
      throw new Error("Department cannot be empty.");
    }
  }
}