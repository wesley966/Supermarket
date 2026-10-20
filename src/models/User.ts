export type UserRole = "ADMIN" | "SUPERVISOR" | "EMPLOYEE";

export class User {
  private readonly id: number;
  private name: string;
  private email: string;
  private readonly role: UserRole;

   constructor(id: number, name: string, email: string, role: UserRole) {
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

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getRole(): UserRole {
    return this.role;
  }

  public updateName(name: string): void {
    this.validateName(name);
    this.name = name.trim();
  }

  public updateEmail(email: string): void {
    this.validateEmail(email);
    this.email = email.trim().toLowerCase();
  }

  public getSummary(): string {
    return `ID: ${this.id} | Name: ${this.name} | Email: ${this.email} | Role: ${this.role}`;
  }

  private validateName(name: string): void {
    if (typeof name !== "string" || name.trim().length < 2) {
      throw new Error("Name must contain at least two characters.");
    }
  }

  private validateEmail(email: string): void {
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      throw new Error("A valid email address is required.");
    }
  }
}

