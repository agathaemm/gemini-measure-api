import { Customer } from '../entities/Customer';

export interface ICustomerRepository {
  create(customer: Customer): Promise<Customer>;
  findById(id: string): Promise<Customer | null>;
  update(customer: Customer): Promise<Customer | null>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Customer[]>;
}
