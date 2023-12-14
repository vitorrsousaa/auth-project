import { compare } from 'bcryptjs';
import { InvalidCredentials } from '../errors/InvalidCredentials';
import { prismaClient } from '../libs/prismaClient';
import { sign } from 'jsonwebtoken';
import { env } from '../config/env';

interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
}

export class SignInUseCase {
  async execute(input: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: {
        email: input.email,
      },
    });

    if (!account) {
      throw new InvalidCredentials();
    }

    const isPasswordValid = await compare(input.password, account.password);

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = sign(
      {
        sub: account.id,
      },
      env.jwtSecret,
      { expiresIn: '1d' }
    );

    return {
      accessToken,
    };
  }
}
