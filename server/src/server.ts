import mongoose from 'mongoose';
import app from '@app';
import config from '@config/config';
import logger from '@core/utils/logger';

const { port } = config;

let server: any;
mongoose.connect(config.mongodbUrl).then(() => {
  logger.info('Connected to MongoDB');
  app.listen(port, (): void => {
    logger.info(`Aapplication listens on PORT: ${port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
