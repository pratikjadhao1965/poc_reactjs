const initialState={
    token:null,
    userId:null,
    profile:null,
    name:null,
    error:null,
    message:null
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case "AUTH_SUCCESS":
            return {
                ...state,
                token:action.token,
                userId:action.userId,
                name:action.name,
                error:null,
                loading:false
            }
        case "AUTH_LOGOUT":
            return {...state,
                        token:null,
                        userId:null,
                        name:null
                    }
        case "CHANGE_NAME":
            return{
                ...state,
                name:null
            }
        case "SET_PROFILE":
            return{
                ...state,
                profile:action.profile
            }
        case "SET_AUTH_ERROR":
            return{
                ...state,
                error:action.error
            }
        case "SET_AUTH_ERROR_NULL":
            return{
                ...state,
                error:null
            }
        case "SET_MESSAGE":
            return{
                ...state,
                message:action.message
            }
        case "SET_MESSAGE_NULL":
            return{
                ...state,
                message:null
            }
        
        default:
            return state
    }
}

export default reducer