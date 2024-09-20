import { ICustomerRepository } from '../../../domain/repositories/customerRepository';

export class DeleteCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(id: string): Promise<void> {
    this.customerRepository.delete(id);
  }
}
