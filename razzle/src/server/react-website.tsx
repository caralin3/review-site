import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from '../client/react/App';

interface Assets {
  client: {
    js: string;
    css: string;
  };
}

const assets: Assets = (() => {
  return require(process.env.RAZZLE_ASSETS_MANIFEST!);
})();

function createHTML(markup: string, js: string, css: string) {
  // tslint:disable max-line-length
  return `
<!doctype html>
<html lang="en">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      <title>App</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${css ? `<link rel="stylesheet" href="${css}">` : ''}
      <script src="${js}" defer crossorigin></script>
  </head>
  <body>
      <main id="root">${markup}</main>
  </body>
</html>`;
  // tslint:enable max-line-length
}

export function render(req: express.Request, res: express.Response) {
  const context = {};
  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  );
  res.send(createHTML(markup, assets.client.js, assets.client.css));
}
