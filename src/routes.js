import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter,
} from 'react-router-dom';

import HomeContainer from './app/Homepage/components';

// import { tokenIsValid, getToken } from './app/utils';

// const token = getToken();

/**
 * @name Router
 * Handles routing
 */
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={HomeContainer} />
      {/* <AuthenticateRoute
        isAuthenticated={tokenIsValid(token)}
        userInfo={token.UserInfo}
        path='/dashboard'
        component={DashboardContainer}
      />
      <AuthenticateRoute
        isAuthenticated={tokenIsValid(token)}
        userInfo={token.UserInfo}
        path='/verify-activities'
        component={VerifyActivitiesContainer}
      />
      <AuthenticateRoute
        isAuthenticated={tokenIsValid(token)}
        userInfo={token.UserInfo}
        path='/redemptions'
        component={RedemptionsContainer}
      />
      <AuthenticateRoute
        isAuthenticated={tokenIsValid(token)}
        userInfo={token.UserInfo}
        path='/activities'
        component={ApproveActivitiesContainer}
      />
      <AuthenticateRoute
        isAuthenticated={tokenIsValid(token)}
        userInfo={token.UserInfo}
        path='/budget'
        component={ApproveBudgetContainer}
      />
      <AuthenticateRoute
        isAuthenticated={tokenIsValid(token)}
        userInfo={token.UserInfo}
        path='/:society'
        component={SocietiesContainer}
      /> */}
    </Switch>
  </BrowserRouter>
);

export default Router;