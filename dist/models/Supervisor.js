"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supervisor = void 0;
const User_1 = require("./User");
class Supervisor extends User_1.User {
    constructor(id, name, email) {
        super(id, name, email, "SUPERVISOR");
    }
    canManageUsers() {
        return false;
    }
}
exports.Supervisor = Supervisor;
