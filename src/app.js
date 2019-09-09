import React from "react";
import { Route, Switch } from "react-router";
import withSession from "./hoc/withSession";

import AdminLayout from "./layouts/adminLayout";
import MainLayout from "./layouts/mainLayout";

// import Signup from './pages/auth/signUp';
import Signin from "./pages/auth/signIn";
import Signout from "./pages/auth/signOut";
import Deshboard from "./pages/dashboard";
import SlideShow from "./pages/admin/slideshow";
import TimeLine from "./pages/admin/timeline";
import NotFound from "./pages/404";
import Home from "./pages/landing";
import TimelineEdit from "./pages/edit/timeline";
import AboutUs from "./pages/aboutUs";
import Products from "./pages/products";
import AdminProducts from "./pages/admin/products";

const Root = ({ refetch, session }) => (
  <Switch>
    <Route
      path="/signin"
      render={props => (
        <AdminLayout>
          <Signin {...props} refetch={refetch} />
        </AdminLayout>
      )}
    />
    {/* <Route path="/signup" render={props => (
      <AdminLayout>
        <Signup {...props} refetch={refetch} />
      </AdminLayout>
    )} /> */}
    <Route
      path="/signout"
      render={props => (
        <AdminLayout>
          <Signout {...props} />
        </AdminLayout>
      )}
    />
    <Route
      path="/admin/dashboard"
      exact
      render={props => (
        <AdminLayout>
          <Deshboard {...props} session={session} />
        </AdminLayout>
      )}
    />
    <Route
      path="/admin/slideshow"
      exact
      render={props => (
        <AdminLayout>
          <SlideShow {...props} session={session} />
        </AdminLayout>
      )}
    />
    <Route
      path="/admin/timeline"
      exact
      render={props => (
        <AdminLayout>
          <TimeLine {...props} session={session} />
        </AdminLayout>
      )}
    />
    <Route
      path="/admin/timeline/edit/:id"
      render={props => (
        <AdminLayout>
          <TimelineEdit {...props} session={session} />
        </AdminLayout>
      )}
    />
    <Route
      path="/admin/products"
      render={props => (
        <AdminLayout>
          <AdminProducts {...props} session={session} />
        </AdminLayout>
      )}
    />
    <Route
      path="/"
      exact
      render={() => (
        <MainLayout>
          <Home />
        </MainLayout>
      )}
    />
    <Route
      path="/home"
      exact
      render={() => (
        <MainLayout>
          <Home />
        </MainLayout>
      )}
    />
    <Route
      path="/aboutUs"
      exact
      render={() => (
        <MainLayout>
          <AboutUs />
        </MainLayout>
      )}
    />
    <Route
      path="/products"
      exact
      render={() => (
        <MainLayout>
          <Products />
        </MainLayout>
      )}
    />
    <Route
      path="/"
      render={props => (
        <MainLayout>
          <NotFound {...props} />
        </MainLayout>
      )}
    />
  </Switch>
);
const AppComponent = withSession(Root);

export default AppComponent;
