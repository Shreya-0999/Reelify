import './App.css';
import SignUp from './Components/Logging In/SignUp';
import Login from './Components/Logging In/Login';
import Feed from './Components/Feeds Area/Feed';
import AuthProvider from './Context/AuthProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    // <Router>
    //   <AuthProvider>
    //     <Switch>
    //       <Route path='/signup' component={SignUp}/>
    //       <Route path='/login' component={Login}/>
    //     </Switch>
    //   </AuthProvider>
    // </Router>
    <AuthProvider>
      {/* <Login/> */}
      <Feed/>
    </AuthProvider>
  );
}

export default App;
