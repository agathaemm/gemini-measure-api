import { Customer } from '../../../domain/entities/Customer';
import { ICustomerRepository } from '../../../domain/repositories/customerRepository';

export class CreateCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(name: string, email: string): Promise<Customer> {
    const customer = new Customer(name, email);
    return this.customerRepository.create(customer);
  }
}
