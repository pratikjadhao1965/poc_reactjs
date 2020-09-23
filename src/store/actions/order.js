import axios from "axios"

//initialises orders history
export const initOrders=(token)=>{
    return (dispatch)=>{
        axios.get(`${process.env.REACT_APP_URL}/api/me/orders`)
            .then(response=>{
                dispatch({
                    type:"INIT_ORDERS",
                    orders:response.data
                    })
            }).catch(error=>{
                if(error.response){
                    dispatch({
                        type:"SET_ORDER_ERROR",
                        error:error.response.data
                        })
                }else{
                    dispatch({
                        type:"SET_ORDER_ERROR",
                        error:"Something Went Wrong"
                        })
                }
                
            })
    }
}

//cancels a order is it is not shipped or delivered
export const cancelOrder=(id,token)=>{
    return dispatch=>{
        axios.delete(`${process.env.REACT_APP_URL}/api/order/${id}`)
            .then(response=>{
                alert("order cancelled")
                dispatch({
                    type:"CANCEL_ORDER",
                    orderId:id
                })
            }).catch(error=>{
                if(error.response){
                    dispatch({
                        type:"SET_ORDER_ERROR",
                        error:error.response.data
                        })
                }else{
                    dispatch({
                        type:"SET_ORDER_ERROR",
                        error:"Something Went Wrong"
                        })
                }
            })
    }
}