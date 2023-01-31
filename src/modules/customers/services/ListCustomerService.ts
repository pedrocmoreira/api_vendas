import { getCustomRepository } from 'typeorm';

import Customer from '../entities/Customer';
import CustomersRepository from '../repositories/CustomersRepository';

export default class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = await customersRepository.find();

    return customers;
  }
}
