import AppError from '@shared/http/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import User from '../entities/User';
import UserRepository from '../repositories/UserRepository';

interface IRequest {
  email: string;
  password: string;
}

export default class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    return user;
  }
}
