import logo from './logo.svg';
import Navbar from './navbar/navbar';
import LoginBox from './loginBox/loginBox';
import "./App.css";
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
