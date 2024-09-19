import { ICustomerRepository } from '../../../domain/repositories/customerRepository';

export class DeleteCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(id: number): Promise<void> {
    this.customerRepository.delete(id);
  }
}
