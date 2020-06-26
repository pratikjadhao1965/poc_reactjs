import React,{useState,useEffect} from "react"
import Input from "../../../components/UI/Input/Input"
import classes from "./Register.css"
import {connect} from "react-redux"
import {NavLink} from "react-router-dom"
import {registerUser} from "../../../store/actions/auth"
import axios from "axios"
import {checkValidity} from "../../../utility/validation"

const register=props=>{
    const [formIsValid,setFormIsValid]=useState(false)
    const [controls,setControls]=useState({
                        name: {
                            elementType: 'input',
                            elementConfig: {
                                type: 'text',
                                placeholder: 'Your Name'
                            },
                            value: '',
                            validation: {
                                required: true
                            },
                            valid: false,
                            touched: false
                        },
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
                        },
                        phone:{
                            elementType: 'input',
                            elementConfig: {
                                type: 'text',
                                placeholder: 'Your Phone'
                            },
                            value: '',
                            validation: {
                                required: true,
                                minLength:8,
                                maxLength: 12,
                                isNumeric: true
                            },
                            valid: false,
                            touched: false
                        },
                        age:{
                            elementType: 'input',
                            elementConfig: {
                                type: 'text',
                                placeholder: 'Your Age'
                            },
                            value: '',
                            validation: {
                                required: true,
                                isNumeric:true
                            },
                            valid: false,
                            touched: false
                        },
                        gender:{
                            elementType: 'select',
                            elementConfig: {
                                options: [
                                    {value: 'male', displayValue: 'Male'},
                                    {value: 'female', displayValue: 'Female'},
                                    {value: 'other', displayValue: 'Other'}
                                ]
                            },
                            value: 'male',
                            validation: {
                                required: true
                            },
                            valid: true,
                            touched: true
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
         props.onRegister(controls.name.value,controls.email.value,controls.password.value,controls.phone.value,controls.age.value,controls.gender.value)
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
         <div className={classes.Register}>
                <h1>Register</h1>
                <form onSubmit={submitHandler}>
                {props.error?<span style={{"color":"red"}}>{props.error}</span>:null}
                {form}
                <button disabled={!formIsValid}>SIGNUP</button>
                
                </form>
                <p>signedup? please <NavLink to="/auth">SignIn</NavLink></p>
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
        onRegister:(name,email,password,phone,age,gender)=>dispatch(registerUser(name,email,password,phone,age,gender))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(register);
