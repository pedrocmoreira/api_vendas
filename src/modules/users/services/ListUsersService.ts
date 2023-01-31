import { getCustomRepository } from 'typeorm';

import User from '../entities/User';
import UserRepository from '../repositories/UserRepository';

export default class ListUsersService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UserRepository);

    const users = await usersRepository.find();

    return users;
  }
}
