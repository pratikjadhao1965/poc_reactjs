import React from "react"
import classes from "./Order.css"

const order=props=>{
  let cancellable=true
    let products=props.products.map(product=>{
      if(product.status!=="in-transit")
      {
        cancellable=false
      }
      
      let color="black"
  if(product.status==="in-transit"){color="orange"}
  else if(product.status==="shipped"){color="blue"}
  else if(product.status==="delivered"){color="green" }
         return <div className={classes.Products} key={product._id}>
            <div style={{"display":"flex"}}>
                <img  className={classes.img} alt="" src={`${process.env.REACT_APP_URL}/api/items/${product._id}/image`} />
                <div className={classes.productInfo}>
                <h4>{product.name}</h4>  <div>Qty:{product.quantity}{"  |  "}<strong>Rs.{product.itemTotal}</strong></div>
                </div></div>
            <div>
              <span>order Status:</span>
              <span className={classes.status} style={{"color":`${color}`}}><strong>{product.status}</strong></span>
            </div>
            <div className={classes.date}>
                  <div>Order Date:
                  <strong>{new Date(props.date).getDate()}-{new Date(props.date).getMonth()}-{new Date(props.date).getFullYear()}</strong></div>
                  {product.status!=="delivered"?<div>Expected Delivery:
                  <strong>{new Date(props.date).getDate()+8}-{new Date(props.date).getMonth()}-{new Date(props.date).getFullYear()}</strong></div>
                  :null}
            </div>
        </div>
    })
    
    return(
        <div  className={classes.Order}>
          
          <div style={{"borderBottom":"1px solid lightgrey"}}><span className={classes.id} >Order #{props._id}</span></div>
          
           {products}
    <div className={classes.address}>
      <span className={classes.addressDetails}>
        <strong>Delivery Address</strong><br/>
        {props.deliveryAddress.name},{props.deliveryAddress.phone}<br/>
        {props.deliveryAddress.location},{props.deliveryAddress.city},{props.deliveryAddress.pincode}{props.deliveryAddress.state}<br/>
        <p><strong>Payment Mode:</strong>{props.paymentMode}</p>
        </span>
         <div>
         
           order total<br/><h4>{props.orderTotal}Rs</h4>
           {cancellable?<button className={classes.button} onClick={props.clicked}>Cancel</button>:null}
       </div>
        </div>
        </div>
      
    )
}

export default order