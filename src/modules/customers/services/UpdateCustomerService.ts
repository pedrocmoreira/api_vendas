import { getCustomRepository } from 'typeorm';

import AppError from '@shared/http/errors/AppError';
import CustomersRepository from '../repositories/CustomersRepository';
import Customer from '../entities/Customer';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateProfileService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found.');
    }

    const customerExists = await customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is a already one user with this email.');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}
