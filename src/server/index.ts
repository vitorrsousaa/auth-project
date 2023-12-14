import express from 'express';
import { SignInController } from '../application/controllers/SignInController';
import { SignInUseCase } from '../application/useCases/SignInUseCase';
import { makeSignUpController } from '../factories/makeSignUpController';
import { makeListLeadsController } from '../factories/makeListLeadsController';

import { routeAdapter } from './adapters/routeAdapter';
import { middlewareAdapter } from './adapters/middlewareAdapter';
import { makeAuthenticationMiddleware } from '../factories/makeAuthenticationMiddleware';

const app = express();

app.use(express.json());

app.post('/sign-up', routeAdapter(makeSignUpController()));

app.post('/sign-in', async (req, res) => {
  const signInUseCase = new SignInUseCase();
  const signInController = new SignInController(signInUseCase);

  const { statusCode, body } = await signInController.handle({
    body: req.body,
  });

  res.status(statusCode).json(body);
});

app.get(
  '/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeListLeadsController())
);

app.listen(3001, () => {
  console.log('Server started at localhost:3001');
});
