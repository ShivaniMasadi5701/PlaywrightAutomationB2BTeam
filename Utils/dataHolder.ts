export class DataHolder {
  private static email: string;
  private static password: string;

  // ✅ SET method
  static setCredentials(email: string, password: string): void {
    this.email = email;
    this.password = password;
  }

  // ✅ GET methods
  static getEmail(): string {
    return this.email;
  }

  static getPassword(): string {
    return this.password;
  }
}
