/**
 * @prettier
 */

/* eslint-disable filenames/match-regex, filenames/match-exported */

import * as React from 'react';
import DocumentImport, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import htmlescape from 'htmlescape';
import { NextPageContext } from 'next';

import NAMES from '~/constants/names';

// choose which env variables should be available on the client
const ENV = {
  NODE_ENV: process.env.NODE_ENV,
};

// Force Next-generated DOM elements to fill their parent's height.
// Not required for using of react-native-web, but helps normalize
// layout for top-level wrapping elements.
// Disable input, textarea outline because blinking caret is enough.
const normalizeNextElements = `
  body,
  body > div:first-child,
  #__next {
    height: 100%;
  }
`;

let index = 0;

type Props = any; // FIXME

type Context = NextPageContext & any;

class Document extends DocumentImport<Props> {
  static async getInitialProps(ctx: Context): Promise<Props> {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Get the current URL being requested
    let url = '';
    if (ctx.req) {
      url = `https://${ctx.req.headers.host}${ctx.req.url}`;
    }

    const initialProps = await DocumentImport.getInitialProps(ctx);

    // eslint-disable-next-line no-return-assign
    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish
      styles: (
        <>
          <style
            dangerouslySetInnerHTML={{ __html: normalizeNextElements }}
            key={(index += 1)}
          />

          {initialProps.styles || flush() || null}
        </>
      ),
      url,
    };
  }

  render(): React.ReactElement<any> {
    return (
      <html lang="en" style={{ height: '100%' }}>
        <Head>
          {/* General */}
          <meta charSet="utf-8" />
          <meta content="text/html; charset=utf-8" httpEquiv="content-type" />
          <meta
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            name="viewport"
          />
          <meta content={NAMES.APP} name="application-name" />
          <meta content="noindex,nofollow" name="robots" />
        </Head>

        <body>
          <Main />

          {/* eslint-disable react/no-danger */}
          <script
            dangerouslySetInnerHTML={{
              __html: `__ENV__ = ${htmlescape(ENV)}`,
            }}
          />
          {/* eslint-enable react/no-danger */}

          <NextScript />
        </body>
      </html>
    );
  }
}

export default Document;
