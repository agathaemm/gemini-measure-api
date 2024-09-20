import { Customer } from '../../../domain/entities/Customer';
import { ICustomerRepository } from '../../../domain/repositories/customerRepository';

export class UpdateCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(
    id: string,
    name: string,
    email: string,
  ): Promise<Customer | null> {
    const customer = new Customer(name, email, id);
    return this.customerRepository.update(customer);
  }
}
