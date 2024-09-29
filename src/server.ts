/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { Server } from 'http';
import app from './app';
import { errorLogger, logger } from './shared/logger';
import config from './config';

async function bootstrap() {
  const server: Server = app.listen(config.port, () => {
    //Debug
    config.node_env === 'development'
      ? console.log(`Server running on port ${config.port}`)
      : logger.info(`Server running on port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        //Debug
        config.node_env === 'development'
          ? console.log('Server closed')
          : logger.info('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    //Debug
    config.node_env === 'development'
      ? console.log(`unexpectedErrorHandler ~~`, error)
      : errorLogger.error(`unexpectedErrorHandler ~~`, error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    //Debug
    config.node_env === 'development'
      ? console.log('SIGTERM received')
      : logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

bootstrap();
