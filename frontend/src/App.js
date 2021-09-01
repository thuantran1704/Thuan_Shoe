import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import AllProductScreen from './screens/AllProductScreen'
import BrandScreen from './screens/BrandScreen'
import AboutScreen from './screens/AboutScreen'
import CategoryScreen from './screens/CategoryScreen'
import ProductCreateScreen from './screens/ProductCreateScreen'
import Navigation from './components/Navigation'


import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap-v5'

const App = () => {
  return (
    <Router>
      <Header />
      <div class="dropdown-divider" />
      <Navigation/>
      <main className='py-2'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          

          <Route path='/allproduct' component={AllProductScreen} exact />
          <Route path='/allproduct/page/:pageNumber' component={AllProductScreen} exact />
          <Route path='/allproduct/search/:keyword' component={AllProductScreen} exact />
          <Route path='/allproduct/search/:keyword/page/:pageNumber' component={AllProductScreen} exact />

          <Route path='/login' component={LoginScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeOrder' component={PlaceOrderScreen} />
          <Route path='/brand/:brand' component={BrandScreen} exact />
          <Route path='/brand/:brand/:pageNumber' component={BrandScreen} exact />
          <Route path='/category/:category' component={CategoryScreen} exact />
          <Route path='/category/:category/:pageNumber' component={CategoryScreen} exact />

          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/product/create' component={ProductCreateScreen} />

          <Route path='/admin/productlist' component={ProductListScreen} exact />
          <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
          <Route path='/admin/productlist/search/:keyword' component={ProductListScreen} exact />
          <Route path='/admin/productlist/search/:keyword/page/:pageNumber' component={ProductListScreen} exact />

          <Route path='/admin/orderlist' component={OrderListScreen} exact />
          <Route path='/admin/orderlist/:pageNumber' component={OrderListScreen} exact />

          <Route path='/order/:id?' component={OrderScreen} />
          <Route path='/about' component={AboutScreen} />
        </Container>
      </main>
      <Footer />
    </Router>

  );
}

export default App;
