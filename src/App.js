import React, { useContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Nothing from './components/Nothing/Nothing';
import ProductDetail from './components/ProductDetails/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Inventory from './components/Inventory/Inventory';


export const userContext = createContext();
function App() {
  const [loggedInUser , setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser , setLoggedInUser]}>
      <Router>
      <Header></Header>
        <Switch>

          <Route exact path="/">
            <Shop></Shop>
         </Route>

          <Route path="/shop">
            <Shop></Shop>
          </Route>

          <Route path="/review">
            <Review></Review>
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>
          
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/product/:productkey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route  path="*">
            <Nothing></Nothing>
          </Route>

        </Switch>


      </Router>
        
       
       
    </userContext.Provider>
  );
}

export default App;
