import { InvalidCredentials } from '../errors/InvalidCredentials';
import { IController, IRequest, IResponse } from '../interfaces/controller';
import { SignInUseCase } from '../useCases/SignInUseCase';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    const { body } = request;

    try {
      const { email, password } = schema.parse(body);
      const { accessToken } = await this.signInUseCase.execute({
        email,
        password,
      });

      return {
        statusCode: 204,
        body: {
          accessToken,
        },
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof InvalidCredentials) {
        return {
          statusCode: 401,
          body: {
            error: 'Invalid credentials',
          },
        };
      }

      throw error;
    }
  }
}
