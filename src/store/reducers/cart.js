const initalState={
    cart:[],
    error:null,
    total:0,
    totalItems:0
}

const reducer=(state=initalState,action)=>{
 switch(action.type){
     case "ADD_QUANTITY":
        const newCart=[...state.cart]
        const index=newCart.findIndex(item=>item._id===action.id)
        if(index!==-1){
        const price=newCart[index].itemTotal/newCart[index].quantity
        
       let updatedItem={...newCart[index]}
       updatedItem.quantity=updatedItem.quantity+1
       updatedItem.itemTotal=updatedItem.itemTotal+price
       newCart[index]=updatedItem
       const newTotal=state.total+price
        const newItemsTotal=state.totalItems+1

         return{
            ...state,
            cart:newCart,
            total:newTotal,
            totalItems:newItemsTotal,
            error:null
         }}
         return state
    case "REMOVE_QUANTITY":
        const newCart1=[...state.cart]
        const index1=newCart1.findIndex(item=>item._id===action.id)
        if(index1!==-1){
        let updatedItem1={...newCart1[index1]}
        const price1=newCart1[index1].itemTotal/newCart1[index1].quantity
        updatedItem1.quantity=updatedItem1.quantity-1
        updatedItem1.itemTotal=updatedItem1.itemTotal-price1
        
        newCart1[index1]=updatedItem1
        const newTotal1=state.total-price1
        if(updatedItem1.quantity<=0){
            newCart1.splice(index1,1)
        } 
        const newItemsTotal1=state.totalItems-1
            return{
            ...state,
            cart:newCart1,
            total:newTotal1,
            totalItems:newItemsTotal1,
            error:null
            }}
        return state

    case "ADD_TO_CART":
        let index2=-1
        index2=state.cart.findIndex(item=>item._id===action._id)
        if(index2===-1){
            const newItem={
            _id:action._id,
            name:action.name,
            quantity:1,
            itemTotal:action.price
        }
        const newTotal2=state.total+action.price
        return{
            ...state,
            cart:[
                ...state.cart,
                newItem
            ],
            total:newTotal2,
            totalItems:state.totalItems+1,
            error:null
        }
    }
    return state
    case "CLEAR_CART":
        return{
            ...state,
            cart:[],
            total:0,
            totalItems:0,
            error:null
        }

    case "SET_CART":
        let itemTotal3=0
        for(let i of action.cartData){
            itemTotal3=itemTotal3+i.quantity
        }
        return{
            ...state,
            cart:[
                ...action.cartData
            ],
            total:action.total,
            totalItems:itemTotal3,
            error:null
        }
        case "SET_CART_ERROR":
            return{
                ...state,
                error:action.error
            }
        case "SET_CART_ERROR_NULL":
            return{
                ...state,
                error:null
            }
        default:
             return state
 }
}

export default reducer