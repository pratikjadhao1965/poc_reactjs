//to show all items/products present in database ,items component is used in shop builder container

import React, { useState,useEffect } from "react"
import Item from "./item/Item"
import Sidebar from "../UI/sidebar/Sidebar"
import {connect} from "react-redux"
import {addToCart,addQuantity,removeQuantity} from "../../store/actions/cart"
import {initItems} from "../../store/actions/item"
import classes from "./Items.css"
import {Spinner} from "react-bootstrap"

const items=(props)=>{
    const [catagories,setCatagories]=useState([])
    const [newItems,setNewItems]=useState([])
    const {items,searchedItems,onInitItems}=props

    useEffect(()=>{
        onInitItems()
    },[])
    

    useEffect(()=>{
       setNewItems(items)
        
    },[items])

    //search items by name when searchlKey is passes 
    useEffect(()=>{
       
        if(searchedItems){
       setNewItems(searchedItems)
    }
    },[searchedItems])
    
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
    
    let itemList=<Spinner animation="border" variant="success"/>
    
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
                           
                    <div className={classes.Items}>
                    {props.errorCart?<p >{props.errorCart}. </p>:null}
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
        searchedItems:state.itemState.searchedItems,
        items:state.itemState.items,
        errorItem:state.itemState.error,
        errorCart:state.cartState.error
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        
        onAddToCart:(id,name,price,token)=>dispatch(addToCart(id,name,price,token)),
        onAddQuantity:(id,token)=>dispatch(addQuantity(id,token)),
        onRemoveQuantity:(id,token)=>dispatch(removeQuantity(id,token)),
        onInitItems:()=>dispatch(initItems()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(items)
