import { User } from "./User";

export class Supervisor extends User {
  public constructor(id: number, name: string, email: string) {
    super(id, name, email, "SUPERVISOR");
  }

  public canManageUsers(): boolean {
    return false;
  }
}