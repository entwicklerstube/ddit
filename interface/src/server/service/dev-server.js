/* eslint no-console: 0 */
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';

import webpackConfig from '../../../webpack.config';

export function listen(DEV_SERVER_PORT, APP_SERVER_PORT) {

  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    contentBase: path.resolve('dist'),
    stats: {colors: true},
    quiet: false,
    noInfo: false,
    proxy: {
      '*': `http://localhost:${APP_SERVER_PORT}`
    }
  }).listen(DEV_SERVER_PORT, 'localhost', (err) => {
    if (err) console.error(err);
    else console.log(`Webpack Dev Server listening at localhost:${DEV_SERVER_PORT}`);
  });

}
