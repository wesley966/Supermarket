"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Armazenamento = void 0;
const User_1 = require("../models/User");
class Armazenamento {
    users = [];
    addUser(user) {
        if (!(user instanceof User_1.User)) {
            throw new Error("A valid user is required.");
        }
        if (this.users.some((storedUser) => storedUser.getId() === user.getId())) {
            throw new Error("A user with this ID already exists.");
        }
        if (this.users.some((storedUser) => storedUser.getEmail() === user.getEmail())) {
            throw new Error("A user with this email already exists.");
        }
        this.users.push(user);
    }
    findUserById(id) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("User ID must be a positive integer.");
        }
        const user = this.users.find((storedUser) => storedUser.getId() === id);
        if (!user) {
            throw new Error("User not found.");
        }
        return user;
    }
    findUserByEmail(email) {
        if (typeof email !== "string" || email.trim().length === 0) {
            throw new Error("Email cannot be empty.");
        }
        const normalizedEmail = email.trim().toLowerCase();
        const user = this.users.find((storedUser) => storedUser.getEmail() === normalizedEmail);
        if (!user) {
            throw new Error("User not found.");
        }
        return user;
    }
    getAllUsers() {
        return [...this.users];
    }
    removeUserById(id) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("User ID must be a positive integer.");
        }
        const index = this.users.findIndex((user) => user.getId() === id);
        if (index === -1) {
            throw new Error("User not found.");
        }
        this.users.splice(index, 1);
    }
    getUserCount() {
        return this.users.length;
    }
    clear() {
        this.users = [];
    }
}
exports.Armazenamento = Armazenamento;
