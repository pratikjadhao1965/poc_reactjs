import axios from "axios"


export const authSuccess=(token,userId,name)=>{
    return{
        type:"AUTH_SUCCESS",
        token:token,
        userId:userId,
        name:name
    }
}

//logout current user
export const logout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    return {
        type:"AUTH_LOGOUT"
    }
} 

//logs out all users
export const logoutAll=()=>{
    return dispatch=>{
        axios.delete(`${process.env.REACT_APP_URL}/api/users/logoutAll`)
            .then(response=>{
                localStorage.removeItem("token")
                localStorage.removeItem("userId")
                dispatch({
                    type:"AUTH_LOGOUT"
                })
                
            })
            .catch((err)=>{
                dispatch({type:"SET_AUTH_ERROR",error:err.response.data.error})
                setTimeout(()=>{
                    dispatch({type:"SET_AUTH_ERROR_NULL"})
                },3000)
            })
    }

}

//logs in 
export const auth=(email,password)=>{
    return dispatch=>{
        const authData={
            email:email,
            password:password
        }
        let url=`${process.env.REACT_APP_URL}/api/users/login`
        axios.post(url,authData,{
            headers:{
                "Content-Type":"application/json"
            }
        })
            .then(response=>{
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("userId",response.data.user._id)
                dispatch(authSuccess(response.data.token,response.data.user._id,response.data.user.name))
                
            })
            .catch((err)=>{
                dispatch({type:"SET_AUTH_ERROR",error:err.response.data})
                setTimeout(()=>{
                    dispatch({type:"SET_AUTH_ERROR_NULL"})
                },3000)
            })
    }
}

//register new user
export const registerUser=(name,email,password,phone,age,gender)=>{
    return dispatch=>{
        const registerData={
            name:name,
            email:email,
            password:password,
            phone:phone,
            addresses:[],
            cart:[],
            age:age,
            gender:gender
        }
        let url=`${process.env.REACT_APP_URL}/api/users`
        axios.post(url,registerData,{
            headers:{
                "Content-Type":"application/json"
            }
        })
            .then(response=>{
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("userId",response.data.user._id)
                dispatch(authSuccess(response.data.token,response.data.user._id,response.data.user.name))
                
            })
            .catch((err)=>{
                dispatch({type:"SET_AUTH_ERROR",error:err.response.data})
                setTimeout(()=>{
                    dispatch({type:"SET_AUTH_ERROR_NULL"})
                },3000)
            })
    }
}


//auto signup using locally stored token nd id
export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem("token")
        if(!token){
            dispatch(logout())
        }
        else{
                const userId=localStorage.getItem("userId")
                dispatch(authSuccess(token,userId))
            }
        }
    }


export const changeName=()=>{
    return {
        type:"CHANGE_NAME"
    }
}

//to initializ=se profile page
export const setProfile=()=>{
    return (dispatch)=>{
        axios.get(`${process.env.REACT_APP_URL}/api/users/me`)
            .then(response=>{
                
                dispatch({
                    type:"SET_PROFILE",
                    profile:response.data
                })
            }).catch((error)=>{
                dispatch({
                    type:"SET_AUTH_ERROR",
                    error:error.response.data.error
                })
                setTimeout(()=>{
                    dispatch({
                        type:"SET_AUTH_ERROR_NULL"
                    })
                },2500)
            })
    }
}
        
//updated user profile info
export const updateProfile=(name,email,phone,age,gender)=>{
    return (dispatch)=>{
        const formData={
            name:name,
            email:email,
            phone:phone,
            age:age,
            gender:gender,
        }
        
        axios.patch(`${process.env.REACT_APP_URL}/api/users/me`,formData,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then(response=>{
            dispatch({
                type:"SET_MESSAGE",
                message:response.data.success
            })
            setTimeout(()=>{
                dispatch({
                    type:"SET_MESSAGE_NULL"
                })
            },2500)
        })
            .catch((error)=>{
                dispatch({
                    type:"SET_AUTH_ERROR",
                    error:error.response.data.error
                })
                setTimeout(()=>{
                    dispatch({
                        type:"SET_AUTH_ERROR_NULL"
                    })
                },2500)
            })
    }
}

//changes user password
export const changePassword=(prevPassword,newPassword)=>{
    return (dispatch)=>{
        const formData={
        prevPassword:prevPassword,
        newPassword:newPassword
    }
    axios.patch(`${process.env.REACT_APP_URL}/api/users/me/pass`,formData,{
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response=>{
                dispatch({
                    type:"SET_MESSAGE",
                    message:response.data.success
                })
                setTimeout(()=>{
                    dispatch({
                        type:"SET_MESSAGE_NULL"
                    })
                },2500)
            
            })
        .catch((error)=>{
                dispatch({
                    type:"SET_AUTH_ERROR",
                    error:error.response.data.error
                })
                setTimeout(()=>{
                    dispatch({
                        type:"SET_ERROR_NULL"
                    })
                },2500)
        })
    }
}