import React, { useState, useEffect } from "react"
import axios from "axios"
import {connect}  from "react-redux"
import classes from "./Addresses.css"
import  {Spinner}  from "react-bootstrap"

const addresses=props=>{

    const [addresses,setAddresses]=useState([])
    const {isAuthenticated}=props
    useEffect(()=>{
        if(isAuthenticated){
        axios.get(`${process.env.REACT_APP_URL}/api/addresses`)
        .then(response=>{
                setAddresses(response.data)
            }).catch((err)=>{
               // console.log(err.response)
            })
        }
    },[isAuthenticated])

    const deleteAddressHandler=(id)=>{
        if(isAuthenticated){
        axios.delete(`${process.env.REACT_APP_URL}/api/users/deleteAddress/${id}`)
        .then(response=>{
                const newAddresses=[...addresses]
                const index=newAddresses.findIndex(address=>address._id===id)
                newAddresses.splice(index,1)
                setAddresses(newAddresses)
            }).catch((err)=>{
                //console.log(err.response)
            })
        }
    }

let addressList=<div style={{"padding":"25%","paddingTop":"20%"}}><Spinner animation="border" variant="success" /></div>
    if(addresses[0]){
     addressList=addresses.map(address=>{
        return (<div key={address._id}>
            <div  className={classes.Address}>
              <span> <span style={{"background":"rgb(200, 260, 93)"}}>Reciever:</span> {address.name}</span> <br/>
              <span><span style={{"background":"rgb(200, 260, 93)"}}>Phone:</span> {address.phone}</span> <br/>
              <span><span style={{"background":"rgb(200, 260, 93)"}}>Address:</span>
              {address.location},{address.city},{address.pincode},{address.state}</span>
                </div>
                {" "}<button className={classes.button} onClick={()=>deleteAddressHandler(address._id)}>Delete</button>
            </div>
        )
    })}
    return(<div>
         <h4>Addresses</h4>
        <div className={classes.Addresses} onClick={props.clicked}>
            {addressList}
        </div></div>
    )
}

const mapStateToProps=state=>{
    return{
        token:state.authState.token,
        isAuthenticated:state.authState.token!==null,
    }
}

export default connect(mapStateToProps)(addresses)
