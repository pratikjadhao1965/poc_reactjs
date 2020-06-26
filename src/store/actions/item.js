import axios from "axios"

//initialises items 
export const initItems=()=>{
    
    return (dispatch)=>{
        axios.get(`${process.env.REACT_APP_URL}/api/allitems`)
        .then(response=>{
            dispatch({
                type:"INIT_ITEMS",
                items:response.data
                })
        }).catch(error=>{
            dispatch({
                type:"SET_ERROR_ITEM",
                error:error.response.data.error
            })
        })
    }

}


export const searchItems=(key)=>{
    return {
        type:"SEARCH",
        searchKey:key
    }
}
