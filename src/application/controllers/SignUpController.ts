import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import { IController, IRequest, IResponse } from '../interfaces/controller';
import { SignUpUseCase } from '../useCases/SignUpUseCase';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    const { body } = request;

    try {
      const { email, name, password } = schema.parse(body);
      await this.signUpUseCase.execute({ email, name, password });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409,
          body: {
            error: 'Account already exists',
          },
        };
      }

      throw error;
    }
  }
}
