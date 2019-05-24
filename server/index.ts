/**
 * @prettier
 */

import express from 'express';
import next from 'next';

import ENV from '../app/constants/env';

import Routes from './routes';

// Create the express server
const expressApp = express();
// Create the next app
const nextApp = (next as any)({
  // Set the `dev` flag in development to enable Hot Module Replacement
  dev: ENV.NODE_ENV === 'development',
  // Custom `pages` location
  dir: './app',
});
// Create the next handle
const nextHandle = Routes.getRequestHandler(nextApp);

// Render a next route
expressApp.get('*', (req, res): void => nextHandle(req, res));

const startServer = async (): Promise<void> => {
  try {
    await nextApp.prepare();
    await expressApp.listen(ENV.PORT);
    // eslint-disable-next-line no-console
    console.log(`> Serving on http://localhost:${ENV.PORT}`);
  } catch (err) {
    throw err;
  }
};

startServer();
