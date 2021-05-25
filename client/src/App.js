import logo from './logo.svg';
import './app.css';
import Navbar from './navbar/navbar';
import LoginBox from './loginBox/loginBox';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
function App() {
  return (
    <div className="app">
      <BrowserRouter>

      <Switch>

          <Route path='/'>
            <LoginBox/>
          </Route>

          <Route>
            
          </Route>

      </Switch>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
