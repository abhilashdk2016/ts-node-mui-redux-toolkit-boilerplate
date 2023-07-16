import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
//import dotenv from 'dotenv';
import morgan from 'morgan';

import router from './router';
import mongoose from 'mongoose';

//dotenv.config();
const app = express();

app.use(cors({
  credentials: true,
}));

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});

const MONGO_URL = 'mongodb://localhost:27017/dashboard-mui'; // DB URI

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL).then(() => {
  console.log('DB Connection Successful')
  app.use('/', router());
})
.catch(error => {
  console.log(error);
  console.log('Connecting to mongodb error')
});
//mongoose.connection.on('error', (error: Error) => console.log(error));


