import { resolve } from 'path';
import './config/database';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './routes/homeRoutes';
import tokenRoutes from './routes/tokenRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import productRoutes from './routes/productRoutes';


const whiteList = [
  'http://35.199.116.113',
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/product', express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/usuario/', usuarioRoutes);
    this.app.use('/product/', productRoutes);
    this.app.use('/tokens/', tokenRoutes);
  }
}

export default new App().app;
