import React from 'react';
import { Route, Switch } from 'react-router';
import withSession from './hoc/withSession';

import AdminLayout from './layouts/adminLayout';
import MainLayout from './layouts/mainLayout';

import Signup from './pages/auth/signUp';
import Signin from './pages/auth/signIn';
import Signout from './pages/auth/signOut';
import Deshboard from './pages/dashboard';
import SlideShow from './pages/slideshow';
import NotFound from './pages/404';
import Home from './pages/landing';


const Root = ({ refetch, session }) =>
  <Switch>
    <Route path="/signin" render={props => (
      <AdminLayout>
        <Signin {...props} refetch={refetch} />
      </AdminLayout>
    )} />
    <Route path="/signup" render={props => (
      <AdminLayout>
        <Signup {...props} refetch={refetch} />
      </AdminLayout>
    )} />
    <Route path="/signout" render={props => (
      <AdminLayout>
        <Signout {...props} />
      </AdminLayout>
    )} />
    <Route path="/dashboard" render={props => (
      <AdminLayout>
        <Deshboard {...props} session={session} />
      </AdminLayout>
    )} />
    <Route path="/slideshow" render={props => (
      <AdminLayout>
        <SlideShow {...props} session={session} />
      </AdminLayout>
    )} />
    <Route path="/" exact render={() => (
      <MainLayout>
        <Home/>
      </MainLayout>
    )} />
    <Route path="/home" exact render={() => (
      <MainLayout>
        <Home/>
      </MainLayout>
    )} />
    <Route path="/" render={props => (
      <MainLayout>
        <NotFound {...props} />
      </MainLayout>
    )} />
  </Switch>
  ;

const AppComponent = withSession(Root);

export default AppComponent;