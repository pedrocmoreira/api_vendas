import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../entities/Customer';
import CustomersRepository from '../repositories/CustomersRepository';

interface IRequest {
  id: string;
}

export default class ShowProfileService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found.');
    }

    return customer;
  }
}
