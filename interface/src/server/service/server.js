import express         from 'express';
import morgan          from 'morgan';
import {join}          from 'path';
import compress        from 'compression';
import renderResponse  from './render-response';

const app = express();

app.use(morgan('dev'));
app.use(compress());
app.use('/static', express.static(join(process.env.PWD, '/src/app/static'), {maxAge : '1d'}));

app.use(renderResponse);

export default app;
