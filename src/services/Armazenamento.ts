import { User } from "../models/User";

export class Armazenamento {
  private users: User[] = [];

  public addUser(user: User): void {
    if (!(user instanceof User)) {
      throw new Error("A valid user is required.");
    }

    if (this.users.some((storedUser) => storedUser.getId() === user.getId())) {
      throw new Error("A user with this ID already exists.");
    }

    if (
      this.users.some(
        (storedUser) => storedUser.getEmail() === user.getEmail()
      )
    ) {
      throw new Error("A user with this email already exists.");
    }

    this.users.push(user);
  }

  public findUserById(id: number): User {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("User ID must be a positive integer.");
    }

    const user = this.users.find((storedUser) => storedUser.getId() === id);
    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }

  public findUserByEmail(email: string): User {
    if (typeof email !== "string" || email.trim().length === 0) {
      throw new Error("Email cannot be empty.");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = this.users.find(
      (storedUser) => storedUser.getEmail() === normalizedEmail
    );

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }

  public getAllUsers(): User[] {
    return [...this.users];
  }

  public removeUserById(id: number): void {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("User ID must be a positive integer.");
    }

    const index = this.users.findIndex((user) => user.getId() === id);
    if (index === -1) {
      throw new Error("User not found.");
    }

    this.users.splice(index, 1);
  }

  public getUserCount(): number {
    return this.users.length;
  }

  public clear(): void {
    this.users = [];
  }
}