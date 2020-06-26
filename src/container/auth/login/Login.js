import React,{useState,useEffect} from "react"
import Input from "../../../components/UI/Input/Input"
import classes from "./Login.css"
import {connect} from "react-redux"
import {auth} from "../../../store/actions/auth"
import {NavLink} from "react-router-dom"
import axios from "axios"
import {checkValidity} from "../../../utility/validation"

const login=props=>{
    const [formIsValid,setFormIsValid]=useState(false)
    const [controls,setControls]=useState({
                        email:{
                            elementType:"input",
                            elementConfig:{
                                type:"email",
                                placeholder:"Email address"
                            },
                            value:"",
                            validation:{
                                required:true,
                                isEmail:true
                            },
                            valid:false,
                            touched:false
                        },
                        password:{
                            elementType:"input",
                            elementConfig:{
                                type:"password",
                                placeholder:"Password"
                            },
                            value:"",
                            validation:{
                                required:true,
                                minLength:7
                            },
                            valid:false,
                            touched:false
                        }
                        
                    })

     const inputChangedHandler=(event,controlName)=>{
        const updatedControls={
            ...controls,
            [controlName]:{
                ...controls[controlName],
                value:event.target.value,
                valid:checkValidity(event.target.value,controls[controlName].validation),
                touched:true
            }
        }
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        setControls(updatedControls)
        setFormIsValid(formIsValid)
    }

    const submitHandler=(event)=>{
        event.preventDefault()
         props.onAuth(controls.email.value,controls.password.value)
    }

    //add items of cart when user was not authenticated to cart after authemtication
    const {isAuthenticated}=props
    useEffect(()=>{
            if(isAuthenticated)
        { 
            axios.patch(`${process.env.REACT_APP_URL}/api/carts`,
                props.cart,
                {headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(response=>{
                props.history.push("/")
            })
        }
        
    },[isAuthenticated])

    const formElementsArray=[]
        for(let key in controls){
            formElementsArray.push({
                id:key,
                config:controls[key]
            })
        }
        let form=formElementsArray.map(formElement=>(
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=>inputChangedHandler(event,formElement.id)}/>
        ))
    return(
         <div className={classes.Login}>
                <h1>Login</h1>
                {props.error?<span style={{"color":"red"}}>{props.error}</span>:null}
                <form onSubmit={submitHandler}>
                {form}
                <button disabled={!formIsValid}>SIGNIN</button>
                
                </form>
                <p>not signedup yet? please  <NavLink to="/register">SignUp</NavLink></p>
                
            </div>
    )
}
const mapStateToProps=(state)=>{
    return{
       isAuthenticated:state.authState.token!==null,
       cart:state.cartState.cart,
       token:state.authState.token,
       error:state.authState.error
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        onAuth:(email,password)=>dispatch(auth(email,password))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(login);
