import { Customer } from '../entities/Customer';

export interface ICustomerRepository {
  create(customer: Customer): Promise<Customer>;
  findById(id: number): Promise<Customer | null>;
  update(customer: Customer): Promise<Customer | null>;
  delete(id: number): Promise<void>;
  findAll(): Promise<Customer[]>;
}
