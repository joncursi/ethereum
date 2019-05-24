/**
 * @prettier
 */

const ENV =
  typeof window !== 'undefined'
    ? // grab env variables from `window` on the client
      (window as any)['__ENV__'] // eslint-disable-line dot-notation
    : // grab env variables from node on the server
      process.env;

export default ENV;
