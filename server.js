import 'babel-polyfill';
import 'isomorphic-unfetch';
import config from 'config';
import path from 'path';
import fs from 'fs';
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
import fileUpload from 'express-fileupload';

import AppComponent from './src/app';
import HTML from './src/helpers/renderer';

import { typeDefs } from './src/schema';
import { resolvers } from './src/resolvers';
import User from './src/models/User';
import SlideShow from './src/models/Slideshow';

// Connect MongoDB
mongoose.connect(config.get('dbString'), { useNewUrlParser: true }).then(() => {
  console.log('Connection to DB successful');
}).catch(err => {
  console.log(`Connection to DB Error: ${err}`);
});

// check env vars
require('./config')();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: `${webConfig.siteURL}`,
    credentials: true
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/", express.static("build/public"));

app.get('/image/:folder/:file', function (req, res) {

  const file_name = req.params.file;
  const get_file = path.resolve(`./user-uploads/${req.params.folder}/` + req.params.file);
  const current_files = fs.readdirSync(`./user-uploads/${req.params.folder}/`);
  const fileExists = current_files.includes(file_name);

  if (fileExists) {
    res.status(200).sendFile(get_file);
  } else {
    res.status(404).send('No File Found!');
  }

});

app.get("/imagesList/:folder", (req, res)=>{
  console.log(req.params.folder)
  if(req.params.folder === "slideshow"){
    console.log('yes')
    SlideShow.find({})
    .then( list => res.status(200).json(list))
    .catch( err => console.log(err))
  }
})

app.get('/user-uploads/:file', function (req, res) {

  const file_name = req.params.file;
  const get_file = path.resolve('./user-uploads/profile-images/' + req.params.file);
  const current_files = fs.readdirSync('./user-uploads/profile-images/');
  const fileExists = current_files.includes(file_name);

  if (fileExists) {
    res.status(200).sendFile(get_file);
  } else {
    res.status(404).send('No File Found!');
  }

});

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

app.use(fileUpload());
const getFileType = (fileType) => {
  let ext;
  if (fileType == 'image/jpeg') {
    ext = '.jpg';
  } else if (fileType == 'image/png') {
    ext = '.png';
  }
  return ext;
}

app.post('/image/upload/:foldName', function (req, res) {
  if (!req.files) return res.status(400).send('No files were uploaded.');

  var current_files = fs.readdirSync(`./user-uploads/${req.params.foldName}/`);
  let profilePic = req.files.selectedFile;
  let fileName = profilePic.name;

  if(current_files.includes(fileName)) res.status(400).send({ message: "file already exist!!"});

  let send_filePath = `./user-uploads/${req.params.foldName}/` + fileName;

  profilePic.mv(send_filePath, function (err) {

    if (err) return res.status(500).send(err);

    const res_dataObj = {
      "newFileName": fileName
    }

    const newSlideShow = new SlideShow({
      image: profilePic.name,
    });

    newSlideShow.save()
    .then(res.send(res_dataObj))
    .catch(err => console.log(err))


  });

});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
