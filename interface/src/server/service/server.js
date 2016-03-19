import express         from 'express';
import morgan          from 'morgan';
import {join}          from 'path';
import compress        from 'compression';
import renderResponse  from './render-response';

const app = express();

app.use(morgan('dev'));
app.use(compress());
app.use('/dist', express.static(join(process.env.PWD, 'dist'), {maxAge : '1d'}));

app.use(renderResponse);

export default app;
