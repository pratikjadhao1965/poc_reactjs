import React from "react"
import classes from "./Cart.css"
import {connect} from "react-redux"
import {addQuantity,removeQuantity,initCart} from "../../store/actions/cart"
import {Spinner} from "react-bootstrap"

const cart =(props)=>{
    let disabled=false
    let cartItems=<Spinner animation="border" variant="success" />
    if(props.cart[0]){
      
     cartItems=props.cart.map(product=>{
       const index=props.items.findIndex(item=>item._id===product._id)
       if(props.items[0]&&props.items[index].stock<=0){
         disabled=true
       }
        return (
            <div className={classes.product} key={product._id}>
            <div className={classes.productimage}>
              <img alt="" src={`${process.env.REACT_APP_URL}/api/items/${product._id}/image`}/>
            </div>
            <div className={classes.productdetails}>
              <div className={classes.producttitle}>{product.name}</div>
              <p className={classes.productdescription}>{product.description}</p>
              
            </div>
            <div className={classes.productprice}>{product.itemTotal/product.quantity}</div>
            <div className={classes.productquantity}>
              <button className={classes.removeproduct} onClick={()=>props.onRemoveQuantity(product._id,props.token,props.cart.quantity)}>
              <strong>-</strong>
              </button>
            <span >{product.quantity}</span>
              <button disabled={disabled} className={classes.removeproduct} onClick={()=>props.onAddQuantity(product._id,props.token,props.cart.quantity)}>
                <strong>+</strong>
              </button>
            </div>
            <div className={classes.productlineprice}>{product.itemTotal}</div>
          </div>
        )
        
    })}
    
    const onCheckOutHandler=()=>{
        if(props.isAuthenticated){
            props.history.push("/checkout")}
                else{
                    props.history.push("/auth")
                }
       
    }

     return(
   <div className={classes.Cart} >
      <h1 >My Cart</h1>
      {props.error?<p>{props.error}</p>:null}
        {props.totalItems===0?<p>Cart Empty</p>:
        <div className={classes.shoppingcart}>

          <div className={classes.columnlabels}>
            <label className={classes.productimage}>Image</label>
            <label className={classes.productdetails}>Product</label>
            <label className={classes.productprice}>Price</label>
            <label className={classes.productquantity}>Quantity</label>
            
            <label className={classes.productlineprice}>Total</label>
          </div>

        {cartItems}

          <div className={classes.totals}>
            
            <div className={classes.totalsitem }>
              <label>Grand Total</label>
              <div className={classes.totalsvalue} id="cart-total">{props.total}</div>
         </div>
      </div>
    
      <button className={classes.checkout} onClick={onCheckOutHandler}>Checkout</button>

      </div>}
    </div>
   )
}

const mapStateToProps=state=>{
    return{
        cart:state.cartState.cart,
        total:state.cartState.total,
        isAuthenticated:state.authState.token!==null,
        token:state.authState.token,
        totalItems:state.cartState.totalItems,
        items:state.itemState.items,
        error:state.cartState.error
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onAddQuantity:(id,token,quantity)=>dispatch(addQuantity(id,token,quantity)),
        onRemoveQuantity:(id,token,quantity)=>dispatch(removeQuantity(id,token,quantity)),
        onInitCart:()=>dispatch(initCart())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(cart)