import React from "react"
import classes from "./SidebarList.css"

const sidebarList =(props)=>{
    return(
    <div className={classes.SidebarList} onClick={props.clicked}>
      
    <p>{props.children}</p>
  
  </div>)
}

export default sidebarList