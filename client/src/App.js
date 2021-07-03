import logo from './logo.svg';
import './app.css';
import Navbar from './navbar/navbar';
import LoginBox from './loginBox/loginBox';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dasboard from './dasboard/dasboard';
import OrderDetails from './order/orderdetails';
function App() {
  return (
    <div className="app">
      <BrowserRouter>

        <Switch>

          <Route exact path='/'>
            <LoginBox />
          </Route>

          <Route path='/dasboard'>
            <Dasboard />
          </Route>
          <Route path='/orderdetails'>
            <OrderDetails />
          </Route>
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
