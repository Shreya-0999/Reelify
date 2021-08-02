import './App.css';
import SignUp from './Components/Logging In/SignUp';
import Login from './Components/Logging In/Login';
import Feed from './Components/Feeds Area/Feed';
import AuthProvider from './Context/AuthProvider';
import PrivateRoute from './Components/Logging In/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Feed}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/login' component={Login}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
