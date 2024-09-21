export type TMeasure = {
  id?: string;
  customerId: string;
  datetime: string;
  type: string;
  value?: number | null;
};

export class Measure {
  public id?: string;
  public customerId: string;
  public datetime: string;
  public type: string;
  public value?: number | null;

  constructor({ customerId, datetime, type, id, value }: TMeasure) {
    this.customerId = customerId;
    this.datetime = datetime;
    this.type = type;

    if (id) {
      this.id = id;
    }

    if (value) {
      this.value = value;
    }
  }
}
