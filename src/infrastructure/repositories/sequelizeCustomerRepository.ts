import { Customer } from '../../domain/entities/Customer';
import { ICustomerRepository } from '../../domain/repositories/customerRepository';
import { CustomerModel } from '../database/models/customerModel';

export class SequelizeCustomerRepository implements ICustomerRepository {
  async create(customer: Customer): Promise<Customer> {
    const createdCustomer = await CustomerModel.create({
      name: customer.name,
      email: customer.email,
    });

    return new Customer(
      createdCustomer.name,
      createdCustomer.email,
      createdCustomer.id,
    );
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await CustomerModel.findByPk(id);
    return customer
      ? new Customer(customer.name, customer.email, customer.id)
      : null;
  }

  async update(customer: Customer): Promise<Customer | null> {
    const updatedCustomer = await CustomerModel.findByPk(customer.id);
    if (updatedCustomer) {
      updatedCustomer.name = customer.name;
      updatedCustomer.email = customer.email;
      await updatedCustomer.save();
      return new Customer(
        updatedCustomer.name,
        updatedCustomer.email,
        updatedCustomer.id,
      );
    }

    return null;
  }

  async delete(id: string): Promise<void> {
    const customer = await CustomerModel.findByPk(id);
    if (customer) {
      await customer.destroy();
    }
  }

  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll();
    return customers.map(
      (customer) => new Customer(customer.name, customer.email, customer.id),
    );
  }
}
