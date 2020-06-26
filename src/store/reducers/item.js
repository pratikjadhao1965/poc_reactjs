const initialState={
    items:[],
    error:null,
    loading:false,
    searchKey:""
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case "INIT_ITEMS":
            return {
                ...state,
                items:action.items,
                error:null
            }
        case "INCREMENT_STOCK":
            const updatedItems=[...state.items]
            const index=updatedItems.findIndex(item=>item._id===action.id)
            updatedItems[index].stock=updatedItems[index].stock+1
            return{
                ...state,
                items:updatedItems
            }
            case "DECREMENT_STOCK":
                const updatedItems1=[...state.items]
                const index1=updatedItems1.findIndex(item=>item._id===action.id)
                updatedItems1[index1].stock=updatedItems1[index1].stock-1
                return{
                    ...state,
                    items:updatedItems1
                }
        case "SET_ERROR_ITEM":
            return {
                ...state,
                items:[],
                error:action.error
            }
        case "SEARCH":
        return {
            ...state,
            searchKey:action.searchKey
        }
       
        default:
            return state
    }
}

export default reducer