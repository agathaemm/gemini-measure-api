export class Customer {
  public id?: string;
  public name: string;
  public email: string;

  constructor(name: string, email: string, id?: string) {
    this.name = name;
    this.email = email;
    if (id) {
      this.id = id;
    }
  }
}
