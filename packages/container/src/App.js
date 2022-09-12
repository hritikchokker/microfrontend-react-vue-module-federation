import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {createBrowserHistory} from 'history';
import Header from "./components/Header";
import Progress from "./components/Progress";
const MarketingApp = lazy(() => import("./components/MarketingApp"));
const AuthApp = lazy(() => import("./components/AuthApp"));
const DashboardApp = lazy(() => import("./components/DashboardApp"));
const generateClassName = createGenerateClassName({
  productionPrefix: "ma",
});

const history = createBrowserHistory()
export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(()=>{
    if(isSignedIn){
      history.push('/dashboard');
    }
  },[isSignedIn])
  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Router path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardApp  />
              </Router>
              <Route path="/">
                <MarketingApp />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
