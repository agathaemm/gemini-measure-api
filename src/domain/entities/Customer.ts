export class Customer {
  public id?: number;
  public name: string;
  public email: string;

  constructor(name: string, email: string, id?: number) {
    this.name = name;
    this.email = email;
    if (id) {
      this.id = id;
    }
  }
}
