export type TMeasure = {
  value?: number | null;
  confirmed?: boolean;
  customerId: string;
  imageUrl?: string;
  datetime: string;
  type: string;
  id?: string;
};

export class Measure {
  public value?: number | null;
  public confirmed?: boolean;
  public customerId: string;
  public imageUrl?: string;
  public datetime: string;
  public type: string;
  public id?: string;

  constructor({
    customerId,
    confirmed,
    datetime,
    imageUrl,
    value,
    type,
    id,
  }: TMeasure) {
    this.confirmed = !!confirmed;
    this.customerId = customerId;
    this.datetime = datetime;
    this.type = type;

    if (id) {
      this.id = id;
    }

    if (value) {
      this.value = value;
    }

    if (imageUrl) {
      this.imageUrl = imageUrl;
    }
  }
}
