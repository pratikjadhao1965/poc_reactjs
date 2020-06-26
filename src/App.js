import React ,{useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontsource-roboto';
import './App.css';
import {Route,Switch} from "react-router-dom"
import Login from "./container/auth/login/Login"
import ShopBuilder from "./container/shopBuilder/ShopBuilder"
import Cart from "./container/cart/Cart"
import Register from "./container/auth/register/Register"
import {connect} from "react-redux"
import {authCheckState} from "./store/actions/auth"
import {initCart} from "./store/actions/cart"
import {initItems} from "./store/actions/item"
import LogoutComponent from './container/auth/logout/Logout';
 import CheckOut from "./components/checkout/CheckOut"
import Orders from "./components/orders/Orders"
import Profile from "./components/profile/Profile"
import Layout from './components/Layout/Layout'


  const app =(props)=> {
    const {onInitCart,onInitItems,isAuthenticated,token,searchKey}=props
  

    useEffect(()=>{
      props.onTryAutoSignup()    
    },[])
    

    useEffect(()=>{
      const timeout=setTimeout(()=>{
          onInitItems(searchKey)
      },500)
      return ()=>{
          clearTimeout(timeout)
      }

  },[onInitItems])

    useEffect(()=>{
        if(isAuthenticated)
        {onInitCart(token)}
    },[isAuthenticated,token,onInitCart])

    let routes=(<div ><Switch>
      <Route path="/register" component={Register}/>
      <Route path="/auth" component={Login}/>
      <Route path="/cart" component={Cart}/>
      <Route path="/" component={ShopBuilder}/>
      </Switch></div>)
    if(props.isAuthenticated===true){
      routes=(<div><Switch>
        <Route path="/register" component={Register}/> 
         <Route path="/auth" component={Login}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/checkout" component={CheckOut}/>
        <Route path="/logout" component={LogoutComponent}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/" component={ShopBuilder}/>
        </Switch>
        
        </div>)
    }
    return (
      <div>
        <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
  crossOrigin="anonymous"
/>
        <Layout>
        {routes}
        </Layout>
        
      </div>
    );
  }



  const mapToStateProps=state=>{
    return{
     
      token:state.authState.token,
        isAuthenticated:state.authState.token!==null,
        cart:state.cartState.cart,
        total:state.cartState.total,
        searchKey:state.itemState.searchKey,
    }
  }
  
  const mapDispatchToProps=(dispatch)=>{
    return{
      onTryAutoSignup:()=>dispatch(authCheckState()),
      onInitItems:(searchKey)=>dispatch(initItems(searchKey)),
      onInitCart:(token)=>dispatch(initCart(token))
    }
  }

export default connect(mapToStateProps,mapDispatchToProps)(app);
