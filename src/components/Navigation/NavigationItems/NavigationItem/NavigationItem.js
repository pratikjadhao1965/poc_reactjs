import React from "react"
import {NavLink} from "react-router-dom"
import classes from "./NavigationItem.css"
const navigationItem=(props)=>(
    <div className={classes.NavigationItem} >
        <NavLink to={props.link}
            activeClassName={classes.active}
            exact
            
             className={props.active?classes.active:null}
        >{props.children}</NavLink>
    </div>
)

export default navigationItem