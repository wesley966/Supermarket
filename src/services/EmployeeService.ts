import { Admin } from "../models/Admim";
import { Employee } from "../models/Employee";
import { Supervisor } from "../models/Supervisor";
import { User, UserRole } from "../models/User";
import { Armazenamento } from "./Armazenamento";

export class EmployeeService {
  private readonly storage: Armazenamento;

  public constructor(storage: Armazenamento) {
    if (!(storage instanceof Armazenamento)) {
      throw new Error("A valid storage instance is required.");
    }
    this.storage = storage;
  }

  public registerUser(
    actor: User,
    role: UserRole,
    id: number,
    name: string,
    email: string,
    salary?: number,
    department?: string
  ): User {
    this.ensureAdmin(actor);

    let user: User;
    switch (role) {
      case "ADMIN":
        user = new Admin(id, name, email);
        break;
      case "SUPERVISOR":
        user = new Supervisor(id, name, email);
        break;
      case "EMPLOYEE":
        if (salary === undefined || department === undefined) {
          throw new Error("Salary and department are required for employees.");
        }
        user = new Employee(id, name, email, salary, department);
        break;
      default:
        throw new Error("Invalid user role.");
    }

    this.storage.addUser(user);
    return user;
  }

  public listUsers(actor: User): User[] {
    this.ensureStaff(actor);
    return this.storage.getAllUsers();
  }

  public getUser(actor: User, id: number): User {
    this.ensureStaff(actor);
    return this.storage.findUserById(id);
  }

  public removeUser(actor: User, id: number): void {
    this.ensureAdmin(actor);

    if (actor.getId() === id) {
      throw new Error("An admin cannot remove their own account.");
    }

    this.storage.removeUserById(id);
  }

  private ensureAdmin(actor: User): void {
    if (!(actor instanceof Admin)) {
      throw new Error("Permission denied. Admin access is required.");
    }
  }

  private ensureStaff(actor: User): void {
    if (!(actor instanceof Admin) && !(actor instanceof Supervisor)) {
      throw new Error("Permission denied. Staff access is required.");
    }
  }
}