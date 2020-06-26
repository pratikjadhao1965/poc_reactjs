import React ,{useState} from "react"
import classes from "./UpdatePassword.css"
import {connect}  from "react-redux"
import Input from "../../UI/Input/Input"
import {checkValidity} from "../../../utility/validation"
import { changePassword } from "../../../store/actions/auth"

const updatePassword=props=>{

    const [formIsValid,setFormIsValid]=useState(false)
    const [controls,setControls]=useState({
        prevPassword:{
            elementType:"input",
            elementConfig:{
                type:"password",
                placeholder:"Previous Password"
            },
            value:"",
            validation:{
                required:true,
                minLength:7
            },
            valid:false,
            touched:false
        },
        newPassword:{
            elementType:"input",
            elementConfig:{
                type:"password",
                placeholder:"New Password"
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
                     
        const passwordChangeHandler=()=>{
            if(props.isAuthenticated){
                props.onChangePassword(controls.prevPassword.value,controls.newPassword.value)
                setControls({
                    ...controls,
                    prevPassword:{
                        ...controls.prevPassword,
                        value:""
                    },
                    newPassword:{
                        ...controls.newPassword,
                        value:""
                    }
                })
            }
        }    

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

 

    return(<React.Fragment>
        {props.error?<span style={{"color":"red"}}>{props.error}</span>:null}
        {props.message?<span style={{"color":"green"}}>{props.message}</span>:null}
        {form}
        <button disabled={!formIsValid} className={classes.button} onClick={passwordChangeHandler}>CHANGE</button>
    </React.Fragment>
    )
}

const mapStateToProps=state=>{
    return{
        token:state.authState.token,
        isAuthenticated:state.authState.token!==null,
        error:state.authState.error,
        message:state.authState.message
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onChangePassword:(prevPassword,newPassword)=>dispatch(changePassword(prevPassword,newPassword))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(updatePassword)









