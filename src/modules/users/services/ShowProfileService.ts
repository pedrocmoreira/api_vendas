import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';

import User from '../entities/User';
import UserRepository from '../repositories/UserRepository';

interface IRequest {
  user_id: string;
}

export default class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}
