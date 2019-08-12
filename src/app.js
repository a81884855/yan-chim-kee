import React from 'react';
import { Route, Switch } from 'react-router';
import withSession from './hoc/withSession';

import MainLayout from './layouts/mainLayout';

import Signup from './pages/auth/signUp';
import Signin from './pages/auth/signIn';
import Signout from './pages/auth/signOut';
import Deshboard from './pages/dashboard';
import SlideShow from './pages/slideshow';
import NotFound from './pages/404';

const Root = ({ refetch, session }) =>
  <Switch>
    <Route path="/signin" render={props => (
      <MainLayout>
        <Signin {...props} refetch={refetch} />
      </MainLayout>
    )} />
    <Route path="/signup" render={props => (
      <MainLayout>
        <Signup {...props} refetch={refetch} />
      </MainLayout>
    )} />
    <Route path="/signout" render={props => (
      <MainLayout>
        <Signout {...props} />
      </MainLayout>
    )} />
    <Route path="/dashboard" render={props => (
      <MainLayout>
        <Deshboard {...props} session={session} />
      </MainLayout>
    )} />
    <Route path="/slideshow" render={props => (
      <MainLayout>
        <SlideShow {...props} session={session} />
      </MainLayout>
    )} />
    <Route path="/" exact render={props => (
      <MainLayout>
        <Signin {...props} refetch={refetch} />
      </MainLayout>
    )} />
    <Route path="/" render={props => (
      <NotFound {...props} />
    )} />
  </Switch>
  ;

const AppComponent = withSession(Root);

export default AppComponent;