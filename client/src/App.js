import logo from './logo.svg';
import './app.css';
import Navbar from './navbar/navbar';
import LoginBox from './loginBox/loginBox';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Dasboard from './dasboard/dasboard';
function App() {
  return (
    <div className="app">
      <BrowserRouter>

      <Switch>

          <Route exact path='/'>
            <LoginBox/>
          </Route>

          <Route path='/dasboard'>
            <Dasboard/>
          </Route>

      </Switch>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
