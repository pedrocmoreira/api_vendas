import { Router } from 'express';

import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello dev!!' });
});

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

export default routes;
