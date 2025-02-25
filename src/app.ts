import cors from 'cors';
import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import notFoundRoute from './app/middlewares/notFoundRoute';
import config from './config';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './app/swagger';

const app: Application = express();

// CHECK CORS
app.use(
  cors({
    origin: [config.frontend_url as string],
    credentials: true,
  }),
);
// app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/v1', routes);

//global error handler
app.use(globalErrorHandler);

//handle not found route
app.use(notFoundRoute);

export default app;
