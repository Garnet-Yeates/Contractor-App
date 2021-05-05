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

function App() {
  return (
    <Provider store={store} >
      <Router>
        {/* A <Switch> looks through its children <Route>s and
                        renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register" component={RegistrationPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/" component={RegistrationPage} /> { /* Landing Page */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
