import { User } from "./User";

export class Admin extends User {
  public constructor(id: number, name: string, email: string) {
    super(id, name, email, "ADMIN");
  }

  public canManageUsers(): boolean {
    return true;
  }
}