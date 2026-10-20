"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const Admim_1 = require("./models/Admim");
const Armazenamento_1 = require("./services/Armazenamento");
const EmployeeService_1 = require("./services/EmployeeService");
const storage = new Armazenamento_1.Armazenamento();
const service = new EmployeeService_1.EmployeeService(storage);
const defaultAdmin = new Admim_1.Admin(1, "System Admin", "admin@supermarket.com");
storage.addUser(defaultAdmin);
function showMenu() {
    console.clear();
    console.log("==================================");
    console.log("   SUPERMARKET EMPLOYEE SYSTEM");
    console.log("==================================");
    console.log("1. List users");
    console.log("2. Find user by ID");
    console.log("3. Register employee");
    console.log("4. Register supervisor");
    console.log("5. Register admin");
    console.log("6. Remove user");
    console.log("0. Exit");
    console.log("==================================");
}
function pause() {
    console.log();
    readline_sync_1.default.question("Press ENTER to continue...");
}
function readPositiveInteger(prompt) {
    const value = readline_sync_1.default.questionInt(prompt);
    if (!Number.isInteger(value) || value <= 0) {
        throw new Error("Please enter a positive integer.");
    }
    return value;
}
function readNonEmptyText(prompt) {
    const value = readline_sync_1.default.question(prompt);
    if (value.trim().length === 0) {
        throw new Error("This field cannot be empty.");
    }
    return value.trim();
}
function registerUser(role) {
    const id = readPositiveInteger("ID: ");
    const name = readNonEmptyText("Full name: ");
    const email = readNonEmptyText("Email: ");
    if (role === "EMPLOYEE") {
        const salary = readline_sync_1.default.questionFloat("Monthly salary: ");
        const department = readNonEmptyText("Department: ");
        const user = service.registerUser(defaultAdmin, role, id, name, email, salary, department);
        console.log(`\nRegistered successfully:`);
        console.log(user.getSummary());
        return;
    }
    const user = service.registerUser(defaultAdmin, role, id, name, email);
    console.log(`\nRegistered successfully:`);
    console.log(user.getSummary());
}
let running = true;
while (running) {
    showMenu();
    try {
        const option = readline_sync_1.default.question("Choose an option: ").trim();
        switch (option) {
            case "1": {
                const users = service.listUsers(defaultAdmin);
                console.clear();
                console.log("========== REGISTERED USERS ==========\n");
                if (users.length === 0) {
                    console.log("No users registered.");
                }
                else {
                    users.forEach((user) => {
                        console.log(user.getSummary());
                    });
                }
                break;
            }
            case "2": {
                const id = readPositiveInteger("User ID: ");
                const user = service.getUser(defaultAdmin, id);
                console.clear();
                console.log("========== USER DETAILS ==========\n");
                console.log(user.getSummary());
                break;
            }
            case "3":
                console.clear();
                console.log("========== REGISTER EMPLOYEE ==========\n");
                registerUser("EMPLOYEE");
                break;
            case "4":
                console.clear();
                console.log("========== REGISTER SUPERVISOR ==========\n");
                registerUser("SUPERVISOR");
                break;
            case "5":
                console.clear();
                console.log("========== REGISTER ADMIN ==========\n");
                registerUser("ADMIN");
                break;
            case "6": {
                const id = readPositiveInteger("User ID to remove: ");
                service.removeUser(defaultAdmin, id);
                console.clear();
                console.log("User removed successfully.");
                break;
            }
            case "0":
                running = false;
                console.clear();
                console.log("Goodbye!");
                continue;
            default:
                throw new Error("Invalid menu option.");
        }
    }
    catch (error) {
        console.clear();
        const message = error instanceof Error
            ? error.message
            : "An unexpected error occurred.";
        console.log("========== OPERATION ERROR ==========\n");
        console.log(message);
    }
    if (running) {
        pause();
    }
}
console.log("Application closed.");
