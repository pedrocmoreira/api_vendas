import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';

import AppError from '@shared/http/errors/AppError';

import UserRepository from '../repositories/UserRepository';
import UserTokensRepository from '../repositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token Expired.');
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}
