import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';

import User from '../entities/User';
import UserRepository from '../repositories/UserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUser {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}
