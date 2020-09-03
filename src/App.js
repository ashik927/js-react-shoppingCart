import React from 'react';
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



function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>

          <Route exact path="/">

          

          </Route>

          <Route path="/shop">

          <Shop></Shop>

          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/inventory">
            
          </Route>
          <Route path="/product/:productkey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route  path="*">
            <Nothing></Nothing>
          </Route>

        </Switch>


      </Router>
        
       
       
    </div>
  );
}

export default App;
