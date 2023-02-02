/* eslint-disable no-underscore-dangle */
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import AppError from './managers/AppError.js';
import noURL from './controllers/errorController.js';
import userRouter from './routers/userRouter.js';
import connectToDB from './managers/DB.js';
import {
  uncaughtExceptionManager,
  unhandledRejectionManager,
} from './managers/baseErrorManager.js';
import envHandler from './managers/envHandler.js';
import productRouter from './routers/productRouter.js';
import shopRouter from './routers/shopRouter.js';

uncaughtExceptionManager;

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(ExpressMongoSanitize());

app.use(express.static(path.join(__dirname, 'public')));

if (envHandler('NODE_ENV') === 'dev') app.use(morgan('dev'));

connectToDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${process.env.PORT}`);
});

unhandledRejectionManager;

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/shop', shopRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl}`, 404));
});

app.use(noURL);

export default app;
