"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    name;
    email;
    role;
    constructor(id, name, email, role) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("User ID must be a positive integer.");
        }
        this.validateName(name);
        this.validateEmail(email);
        this.id = id;
        this.name = name.trim();
        this.email = email.trim().toLowerCase();
        this.role = role;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return this.role;
    }
    updateName(name) {
        this.validateName(name);
        this.name = name.trim();
    }
    updateEmail(email) {
        this.validateEmail(email);
        this.email = email.trim().toLowerCase();
    }
    getSummary() {
        return `ID: ${this.id} | Name: ${this.name} | Email: ${this.email} | Role: ${this.role}`;
    }
    validateName(name) {
        if (typeof name !== "string" || name.trim().length < 2) {
            throw new Error("Name must contain at least two characters.");
        }
    }
    validateEmail(email) {
        if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            throw new Error("A valid email address is required.");
        }
    }
}
exports.User = User;
