import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import HomeComponent from './components/HomeComponent/HomeComponent';
import BookOverviewComponent from './components/BookOverviewComponent/BookOverviewComponent';
import CheckoutComponent from './components/CheckoutComponent/CheckoutComponent';
import CartComponent from './components/CartComponent/CartComponent';
import OrdersComponent from './components/OrdersComponent/OrderComponent';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Switch>
        <Route path="/book/:id" exact>
          <BookOverviewComponent />
        </Route>
        <Route path="/orders" exact component={OrdersComponent} />
        <Route path="/cart" exact component={CartComponent} />
        <Route path="/checkout" component={CheckoutComponent}/>
        <Route path="/" exact component={HomeComponent} />
        <Route component={HomeComponent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
