import { Request, Response } from 'express';

import { CreateCustomerUseCase } from '../../application/useCases/customer/createCustomerUseCase';
import { SequelizeCustomerRepository } from '../../infrastructure/repositories/sequelizeCustomerRepository';

const customerRepository = new SequelizeCustomerRepository();

const create = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

  try {
    const customer = await createCustomerUseCase.execute(name, email);
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

export default {
  create,
};
