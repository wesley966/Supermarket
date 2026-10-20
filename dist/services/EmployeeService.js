"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const Admim_1 = require("../models/Admim");
const Employee_1 = require("../models/Employee");
const Supervisor_1 = require("../models/Supervisor");
const Armazenamento_1 = require("./Armazenamento");
class EmployeeService {
    storage;
    constructor(storage) {
        if (!(storage instanceof Armazenamento_1.Armazenamento)) {
            throw new Error("A valid storage instance is required.");
        }
        this.storage = storage;
    }
    registerUser(actor, role, id, name, email, salary, department) {
        this.ensureAdmin(actor);
        let user;
        switch (role) {
            case "ADMIN":
                user = new Admim_1.Admin(id, name, email);
                break;
            case "SUPERVISOR":
                user = new Supervisor_1.Supervisor(id, name, email);
                break;
            case "EMPLOYEE":
                if (salary === undefined || department === undefined) {
                    throw new Error("Salary and department are required for employees.");
                }
                user = new Employee_1.Employee(id, name, email, salary, department);
                break;
            default:
                throw new Error("Invalid user role.");
        }
        this.storage.addUser(user);
        return user;
    }
    listUsers(actor) {
        this.ensureStaff(actor);
        return this.storage.getAllUsers();
    }
    getUser(actor, id) {
        this.ensureStaff(actor);
        return this.storage.findUserById(id);
    }
    removeUser(actor, id) {
        this.ensureAdmin(actor);
        if (actor.getId() === id) {
            throw new Error("An admin cannot remove their own account.");
        }
        this.storage.removeUserById(id);
    }
    ensureAdmin(actor) {
        if (!(actor instanceof Admim_1.Admin)) {
            throw new Error("Permission denied. Admin access is required.");
        }
    }
    ensureStaff(actor) {
        if (!(actor instanceof Admim_1.Admin) && !(actor instanceof Supervisor_1.Supervisor)) {
            throw new Error("Permission denied. Staff access is required.");
        }
    }
}
exports.EmployeeService = EmployeeService;
