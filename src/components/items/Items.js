import React, { useState,useEffect } from "react"
import Item from "./item/Item"
import Sidebar from "../UI/sidebar/Sidebar"
import {connect} from "react-redux"
import {addToCart,addQuantity,removeQuantity} from "../../store/actions/cart"
import classes from "./Items.css"
import {Spinner} from "react-bootstrap"

const items=(props)=>{
    const [catagories,setCatagories]=useState([])
    const [newItems,setNewItems]=useState([])
    const [error,setError]=useState(null)
    const {items,searchKey}=props

    //search items using name
    useEffect(()=>{
        const regex=new RegExp(searchKey,"i")
        const updatedItems=items.filter(item=>item.name.match(regex))
        let timeout
        if(!updatedItems[0]){
            timeout=setTimeout(()=>{setError("items not found")},7000)
        }
        setNewItems([...updatedItems])
        setError(null)
        return ()=>{
            clearTimeout(timeout)
        }
    },[items,searchKey])

    
    const addToCartHandler=(id,name,price)=>{
            props.onAddToCart(id,name,price,props.token)
    }

    //search items using catagory
    const searchByCatagoryHandler=(catagory)=>{
        if(catagory==="all")
        {
            return setNewItems([...items])
        }
        const updatedItems=items.filter(item=>item.catagory===catagory)
        setNewItems(updatedItems)
    }

    for(let item of props.items){
        const index=catagories.findIndex(catagory=>item.catagory===catagory)
        if(index===-1){
            setCatagories([...catagories,item.catagory])
        }
    }
    
    let itemList=<div>{error?<p>{error}</p>:<Spinner animation="border" variant="success"/>}</div>
    
    if(newItems[0]){
     itemList=newItems.map(item=>{
      
        const index=props.cart.findIndex(i=>i._id===item._id)
        let quantity
        if(index!==-1){
            quantity=props.cart[index].quantity                
        }
        return <Item 
                res={item} 
                key={item._id}
                itemQuantity={quantity}
                added={()=>props.onAddQuantity(item._id,props.token)}
                removed={()=>props.onRemoveQuantity(item._id,props.token)}
                addToCart={()=>addToCartHandler(item._id,item.name,item.price)}
                />
    })}
    
    return(
        <React.Fragment > 
            <Sidebar catagories={catagories} clicked={(catagory)=>searchByCatagoryHandler(catagory)}/>
            {props.errorCart?<span style={{"position":"relative","marginLeft":"50%"}}>{props.errorCart}</span>:null}                
                    <div className={classes.Items}>
                    {props.errorItem?<p>{props.errorItem}</p>:itemList}
                     </div>
            </React.Fragment > 
    )
}

const mapStateToProps=state=>{
    return{
        token:state.authState.token,
        isAuthenticated:state.authState.token!==null,
        cart:state.cartState.cart,
        searchKey:state.itemState.searchKey,
        items:state.itemState.items,
        errorItem:state.itemState.error,
        errorCart:state.cartState.error
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        
        onAddToCart:(id,name,price,token)=>dispatch(addToCart(id,name,price,token)),
        onAddQuantity:(id,token)=>dispatch(addQuantity(id,token)),
        onRemoveQuantity:(id,token)=>dispatch(removeQuantity(id,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(items)
