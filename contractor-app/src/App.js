import axios from 'axios'

import DashboardPage from './Dashboard/DashboardPage'
import store from './Redux/store'

import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from './Authorization/Pages/LoginPage';
import RegistrationPage from './Authorization/Pages/RegistrationPage';
import { useEffect } from 'react';
import { loginUser } from './Redux/auth/authReduxActions';
import AuthRoute from './Authorization/AuthRoute';

console.log('Loading App.js ')
// Check if user is logged in
const token = localStorage.jwtToken;
if (token)
  store.dispatch(loginUser(token));

function App() {
  return (
    <Provider store={store} >
      <Router>
        <Switch>
          <Route path="/register" component={RegistrationPage} />
          <Route path="/login" component={LoginPage} />
          <AuthRoute path="/dashboard/:action?" component={DashboardPage} />
          <Route path="/" component={RegistrationPage} /> { /* Landing Page */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
