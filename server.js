import 'babel-polyfill';
import 'isomorphic-unfetch';
import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import webConfig from './webConfig';
import { StaticRouter } from 'react-router';
import { InMemoryCache } from 'apollo-cache-inmemory';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import mongoose from 'mongoose';
import cors from 'cors';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { Helmet } from 'react-helmet';
import compression from 'compression'; 

import AppComponent from './src/app';
import HTML from './src/helpers/renderer';

import { typeDefs } from './src/schema';
import { resolvers } from './src/resolvers';
import User from './src/models/User';

import slideshow from './routes/api/slideshow';
import timeline from './routes/api/timeline';

// Connect MongoDB
mongoose.connect(config.get('dbString'), { useNewUrlParser: true }).then(() => {
  console.log('Connection to DB successful');
}).catch(err => {
  throw `Connection to DB Error: ${err}`;
});

// check env vars
require('./config')();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(cors({ origin: `${webConfig.siteURL}`, credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use("/", express.static("build/public"));

app.use("/images", express.static("images"))
app.use("/api/slideshow", slideshow)
app.use("/api/timeline", timeline)

// JWT Middelware 
app.use(async (req, res, next) => {

  const token = req.cookies.token ? req.cookies.token : null;
  if (token !== null) {
    try {
      const currentUser = await jwt.verify(token, config.get('jwtPrivateKey'));
      req.currentUser = currentUser;
    } catch (err) {
      //   console.error(err);
      res.clearCookie('token');
    }
  }
  next();
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// create Graphiql app
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

// connect schema with graphql
app.use('/graphql',
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      User,
      currentUser
    }
  }))
);

app.get(['*/:param', '*'], (req, res) => {

  const URL_Param = req.params.param ? req.params.param : null;

  const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
      uri: `${webConfig.siteURL}/graphql`,
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
    }),
    cache: new InMemoryCache(),
  });

  const context = {
    URL_Param
  };

  // The client-side App will instead use <BrowserRouter>
  const App = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <AppComponent />
      </StaticRouter>
    </ApolloProvider>
  );

  // Handle queries etc.. before sending raw html
  getDataFromTree(App).then(() => {

    const content = ReactDOM.renderToString(App);
    const helmet = Helmet.renderStatic();

    const initialState = client.extract();
    const html = <HTML content={content} state={initialState} helmet={helmet} />;

    res.status(200);
    res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
    res.end();

  });

});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
