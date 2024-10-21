import express, { Application } from 'express';

import api from 'api';
import bodyParser from 'body-parser';
import httpContext from 'express-http-context';
import consts from '@config/consts';
import httpLogger from '@core/utils/httpLogger';
import uniqueReqId from '@core/middlewares/uniqueReqId.middleware';
import http404 from 'modules/404/404.router';
import cors from 'cors';
import passport from 'passport';
import { jwtStrategy } from '@modules/auth';
import session from 'express-session';
import config from '@config/config';
import { errorConverter, errorHandler } from '@core/errors';

const app: Application = express();

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(httpContext.middleware);
app.use(httpLogger.successHandler);
app.use(httpLogger.errorHandler);
app.use(uniqueReqId);
app.use(
  session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
passport.use(jwtStrategy);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(consts.API_ROOT_PATH, api);
app.use(http404);
app.use(errorConverter);
app.use(errorHandler);

export default app;
