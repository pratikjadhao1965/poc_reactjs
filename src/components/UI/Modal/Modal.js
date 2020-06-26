import React,{useState} from "react"
import classes from "./Modal.css" 

const modal=props=>{
    const [modalClosed,setModalClosed]=useState(true)
     return (
    <React.Fragment>
    
        {modalClosed?<div onClick={()=>setModalClosed(false)}>
           
        <div className={classes.Modal}
       
        style={{
            transform:props.show?"translateY(0)":"translateY(-100vh)",
            opacity:props.show?"1":"0"
        }}>
        {props.children}
    </div></div>:null}
    </React.Fragment>
)}

export default React.memo(modal,(prevProps,nextProps)=>nextProps.show===prevProps.show && nextProps.children===prevProps.children)