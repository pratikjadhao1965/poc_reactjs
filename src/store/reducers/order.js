const initialState={
    orders:[],
    error:null,
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case "INIT_ORDERS":
            return {
                ...state,
                orders:action.orders,
                error:null
            }
        case "CANCEL_ORDER":
            const newOrders=[...state.orders]
            const index=newOrders.findIndex(order=>order._id===action.id)
            newOrders.splice(index,1)
            if(!newOrders[0]){
                return {
                    ...state,
                    orders:[],
                    error:"orders not found"
                }
            }
            return {
                ...state,
                orders:newOrders,
                error:null
            }
        case "SET_ORDER_ERROR":
            return {
                ...state,
                orders:[],
                error:action.error
            }       
        default:
            return state
    }
}

export default reducer