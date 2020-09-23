import axios from "axios"

//increments item in cart state 
//increments item in cart in database
//Decrements stock by 1
export const addQuantity=(id,token)=>{
    return (dispatch)=>{
        if(token){
            axios.patch(`${process.env.REACT_APP_URL}/api/carts/additem/${id}`,{},
                    {
                        headers:{
                        "Content-Type":"application/json"
                    }
                })
                .then(response=>{
                    dispatch({
                        type:"ADD_QUANTITY",
                        id:id
                    }) 
                    dispatch({
                        type:"DECREMENT_STOCK",
                        id:id
                    })
            }).catch(error=>{
                if(error.response)
            {
                dispatch({type:"SET_CART_ERROR",error:error.response.data.error})
            }else{
                dispatch({type:"SET_CART_ERROR",error:"something went wrong"})
            }
                setTimeout(()=>{
                    dispatch({type:"SET_CART_ERROR_NULL"})
                },3000)
            })
        }else{
            dispatch({
                type:"ADD_QUANTITY",
                id:id
            })
            dispatch({
                type:"DECREMENT_STOCK",
                id:id
            })
        }
        
    }
}

//decrements item in cart state 
//decrements item in cart in database
//increments stock by 1
export const removeQuantity=(id,token)=>{
    
    return (dispatch)=>{
    if(token){
        axios.patch(`${process.env.REACT_APP_URL}/api/carts/removeitem/${id}`,{},
                {headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(response=>{
                dispatch({
                    type:"REMOVE_QUANTITY",
                    id:id
                }) 
                dispatch({
                    type:"INCREMENT_STOCK",
                    id:id
                }) 
            }).catch(error=>{
                dispatch({type:"SET_CART_ERROR",error:error.response.data.error})
            setTimeout(()=>{
                dispatch({type:"SET_CART_ERROR_NULL"})
            },3000)
            })}
            else{
                dispatch({
                    type:"REMOVE_QUANTITY",
                    id:id
                })
                dispatch({
                    type:"INCREMENT_STOCK",
                    id:id
                }) 
            }
            
        }
}
export const initCartData=(cartData,total)=>{
   
        return{
            type:"SET_CART",
            cartData:cartData,
            total:total
        }
    
    
}

//initialises cart of user if present
export const initCart=()=>{
    return dispatch => {
        axios.get(`${process.env.REACT_APP_URL}/api/carts`,
        ).then(response=>{
            dispatch(initCartData(response.data.cart,response.data.total))
        })
        .catch((error)=>{
            if(error.response)
            {
                dispatch({type:"SET_CART_ERROR",error:error.response.data.error})
            }else{
                dispatch({type:"SET_CART_ERROR",error:"something went wrong"})
            }
            setTimeout(()=>{
                dispatch({type:"SET_CART_ERROR_NULL"})
            },3000)
        })
    }
}

//initialises item cart items in cart state
//triggers when add to cart button is clicked
export const addToCart=(id,name,price,token)=>{
    return dispatch=>{
        if(token){
        axios.patch(`${process.env.REACT_APP_URL}/api/carts/additem/${id}`,{},
                {headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(response=>{
                      dispatch( {
                        type:"ADD_TO_CART",
                        _id:id,
                        name:name,
                        price:price
                    })
                    dispatch({
                        type:"DECREMENT_STOCK",
                        id:id
                    })
            }).catch(error=>{
                //console.log(error)
                if(error.response){
                    dispatch({type:"SET_CART_ERROR",error:error.response.data.error})
                }
                else{
                    dispatch({type:"SET_CART_ERROR",error:"something went wrong"})
                }
                setTimeout(()=>{
                    dispatch({type:"SET_CART_ERROR_NULL"})
                },3000)
            })
        }
        else{
           
            dispatch( {
                type:"ADD_TO_CART",
                _id:id,
                name:name,
                price:price
            })
            dispatch({
                type:"DECREMENT_STOCK",
                id:id
            })
        }
    }
        
}

//places order 
//triggers when order button is clicked on checkout page
export const placeOrder=(cart,total,form)=>{
    return (dispatch)=>{

        const data={
            products:cart,
            orderTotal:total,
            deliveryAddress:{
                location:form.location.value,
                city:form.city.value,
                pincode:form.pincode.value,
                state:form.state.value,
                name:form.name.value,
                phone:form.phone.value
            },
            paymentMode:form.paymentMode.value
        }
        axios.post(`${process.env.REACT_APP_URL}/api/placeorder`,
                data,
                {headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(response=>{
                alert("order placed! check in orders") 
                dispatch(clearCart()) 
                                 
            }).catch(error=>{
                if(error.response)
            {
                dispatch({type:"SET_CART_ERROR",error:error.response.data.error})
            }else{
                dispatch({type:"SET_CART_ERROR",error:"something went wrong"})
            }
            setTimeout(()=>{
                dispatch({type:"SET_CART_ERROR_NULL"})
            },3000)
            })
        }
}


//clears the cart when order is placed
export const clearCart=()=>{
    return (dispatch)=>{
          axios.delete(`${process.env.REACT_APP_URL}/api/carts/removeitems`)
            .then(response=>{  
                dispatch({
                    type:"CLEAR_CART"
                })
             }).catch(error=>{
                if(error.response)
            {
                dispatch({type:"SET_CART_ERROR",error:error.response.data.error})
            }else{
                dispatch({type:"SET_CART_ERROR",error:"something went wrong"})
            }
                setTimeout(()=>{
                    dispatch({type:"SET_CART_ERROR_NULL"})
                },3000)
            })
    }
}

