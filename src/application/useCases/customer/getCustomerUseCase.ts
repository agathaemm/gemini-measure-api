import { Customer } from '../../../domain/entities/Customer';
import { ICustomerRepository } from '../../../domain/repositories/customerRepository';

export class GetCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(id: number): Promise<Customer | null> {
    return this.customerRepository.findById(id);
  }
}
