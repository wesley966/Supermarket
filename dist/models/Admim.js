"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const User_1 = require("./User");
class Admin extends User_1.User {
    constructor(id, name, email) {
        super(id, name, email, "ADMIN");
    }
    canManageUsers() {
        return true;
    }
}
exports.Admin = Admin;
