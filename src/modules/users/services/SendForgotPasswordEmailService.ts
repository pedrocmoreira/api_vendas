import { getCustomRepository } from 'typeorm';
import AppError from '@shared/http/errors/AppError';

import UserRepository from '../repositories/UserRepository';
import UserTokensRepository from '../repositories/UserTokensRepository';

import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    console.log(user);

    const token = await userTokensRepository.generate(user.id);

    // console.log(token);

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de senha',
      templateData: {
        template: `Olá {{name}}: {{token}}`,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}
