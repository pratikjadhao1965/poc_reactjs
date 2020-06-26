import React,{useState,useEffect} from "react"
import Input from "../UI/Input/Input"
import classes from "./CheckOut.css"
import {connect} from "react-redux"
import {placeOrder}  from "../../store/actions/cart"
import axios from "axios"
import {checkValidity} from "../../utility/validation"

const checkOut =(props)=>{
    const [addresses,setAddresses]=useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/api/addresses`,{
            headers:{
                "Authorization":`${props.token}`
            }
        })
            .then(response=>{
                setAddresses(response.data)
            })
    },[])

    const [formIsValid,setFormIsValid]=useState(false)
   const [controls,setControls]=useState({
                        location: {
                            elementType: 'input',
                            elementConfig: {
                                type: 'text',
                                placeholder: 'Housename/street/locality'
                            },
                            value: '',
                            validation: {
                                required: true
                            },
                            valid: false,
                            touched: false
                        },
                        
                        city:{
                            elementType: 'input',
                            elementConfig: {
                                type: 'text',
                                placeholder: 'City'
                            },
                            value: '',
                            validation: {
                                required: true                                
                            },
                            valid: false,
                            touched: false
                        },
                        pincode:{
                            elementType:"input",
                            elementConfig:{
                                type:"text",
                                placeholder:"Pincode"
                            },
                            value:"",
                            validation:{
                                required:true,
                                isNumeric:true,
                                minLength:6,
                                maxLength:6
                            },
                            valid:false,
                            touched:false
                        },
                        state:{
                            elementType: 'input',
                            elementConfig: {
                                type: 'text',
                                placeholder: 'State'
                            },
                            value: '',
                            validation: {
                                required: true
                            },
                            valid: false,
                            touched: false
                        },
                        name:{
                            elementType: 'input',
                            elementConfig: {
                                type: 'text',
                                placeholder: 'Reciever name'
                            },
                            value: '',
                            validation: {
                                required: true
                            },
                            valid: false,
                            touched: false
                        },
                        phone:{
                            elementType:"input",
                            elementConfig:{
                                type:"text",
                                placeholder:"Phone No."
                            },
                            value:"",
                            validation:{
                                required:true,
                                isNumeric:true,
                                minLength:10,
                                maxLength:12
                            },
                            valid:false,
                            touched:false
                        },
                        paymentMode:{
                            elementType: 'select',
                            elementConfig: {
                                
                                options: [
                                    {value: 'card', displayValue: 'Card'},
                                    {value: 'upi', displayValue: 'Upi'},
                                    {value: 'cod', displayValue: 'Cod'}
                                ]
                            },
                            value: 'card',
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

    const submitOrderHandler=(event)=>{
        event.preventDefault()
        if(props.isAuthenticated){
         props.onSubmitOrderHandler(props.cart,props.total,controls)
         props.history.push("/")
        }
    }

    const selectAddressHandler=(address)=>{
        let updatedControls={...controls}
        
        for(let key in address){
            if(key!=="_id"){
            updatedControls={
                ...updatedControls,
                [key]:{
                    ...updatedControls[key],
                    value:address[key].toString(),
                    valid:checkValidity(address[key].toString(),controls[key].validation),
                    touched:true
                }
            }}
        }
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        setControls(updatedControls)
        setFormIsValid(formIsValid)
    }
    let addressList=addresses.map(address=>{
    return (<div className={classes.address} key={address._id} onClick={()=>selectAddressHandler(address)}>
                <br/><strong>{address.name},{" "}
                {address.phone}</strong><br/>
                {address.location},{" "}
                {address.pincode},{" "}{address.city},{" "}
                {address.state}<br/>
               
    </div>)
    })

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
        let summary=null
        
             summary=props.cart.map(item=>(<div
             key={item._id}>{item.quantity}x {item.name} : {item.itemTotal}<br/></div>
             ))
    return(
         <div className={classes.CheckOut}>
                 <div className={classes.summary}>
                <h2>Order Summary</h2>
                    <p>You have {props.totalItems} items in your shopping cart</p>
                    {summary}
            <p>total :{props.total}</p>
            <hr/>
            {addressList[0]?<div>
                <h4>Select Previous Address</h4>
                <hr/>
                <div className={classes.addresses}>
                    {addressList}
                </div>
                </div>:null}
            </div>
                <form onSubmit={submitOrderHandler} className={classes.form}>
                <h2>Address Details</h2>
                {form}
                <button disabled={!formIsValid}>ORDER</button>
                </form>
                
               
               
            </div>
    )
}

const mapStateToProps=state=>{
    return{
        cart:state.cartState.cart,
        total:state.cartState.total,
        isAuthenticated:state.authState.token!==null,
        token:state.authState.token,
        totalItems:state.cartState.totalItems
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onSubmitOrderHandler:(cart,total,form)=>dispatch(placeOrder(cart,total,form))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(checkOut)
