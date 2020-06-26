import React, {  useEffect } from "react"
import Order from "./order/Order"
import classes from "./Orders.css"
import {connect} from "react-redux"
import {Spinner} from "react-bootstrap"
import {initOrders,cancelOrder}  from "../../store/actions/order"

const orders=props=>{

    useEffect(()=>{
        props.onInitOrders(props.token)
    },[])

    let orderList=<Spinner animation="border" variant="success" />
    if(props.orders[0]){
    orderList=props.orders.reverse().map(order=>{
        return (<Order 
                    key={order._id}
                    _id={order._id}
                    products={order.products}
                    paymentMode={order.paymentMode}
                    orderTotal={order.orderTotal}
                    deliveryAddress={order.deliveryAddress}
                    date={order.createdAt}
                    clicked={()=>props.onCancelOrder(order._id,props.token)}
                    />)
    })}
    return(
   
        <div className={classes.Orders}>
            <h1 >My Orders</h1>
    {props.error?<h6>{props.error}</h6>:orderList}
           
        </div>
    )
}

const mapStateToProps=state=>{
    return{
        token:state.authState.token,
        isAuthenticated:state.authState.token!==null,
        orders:state.orderState.orders,
        error:state.orderState.error
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onInitOrders:()=>dispatch(initOrders()),
        onCancelOrder:(id)=>dispatch(cancelOrder(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(orders)
