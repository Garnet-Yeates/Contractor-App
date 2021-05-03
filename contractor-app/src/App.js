import axios from 'axios'

import DashboardPage from './Dashboard/DashboardPage'
import store from './Redux/store'

import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store} >
      <DashboardPage />
    </Provider>
  );
}

export default App;
