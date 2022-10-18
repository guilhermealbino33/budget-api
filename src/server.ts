import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './data-source';
import { router } from './routes';
import logging from './shared/config/logging';
import { AppError } from './shared/errors/AppError';

import swagger from './swagger.json';

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(router);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));
  app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          message: err.message,
        });
      }

      return response.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`,
      });
    }
  );

  const port = process.env.PORT;

  return app.listen(port, () => {
    logging.info(`Server is running on port ${port}`);
  });
});
