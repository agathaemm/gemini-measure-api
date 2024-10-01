export type TMeasure = {
  id?: string;
  customerId: string;
  datetime: string;
  type: string;
  value?: number | null;
  confirmed?: boolean;
};

export class Measure {
  public id?: string;
  public customerId: string;
  public datetime: string;
  public type: string;
  public value?: number | null;
  public confirmed?: boolean;

  constructor({ customerId, datetime, type, id, value, confirmed }: TMeasure) {
    this.customerId = customerId;
    this.datetime = datetime;
    this.type = type;
    this.confirmed = !!confirmed;

    if (id) {
      this.id = id;
    }

    if (value) {
      this.value = value;
    }
  }
}
