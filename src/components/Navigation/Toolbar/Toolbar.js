import React from "react"
import NavigationItems from "../NavigationItems/NavigationItems"
import {Navbar} from "react-bootstrap"
import {NavLink} from "react-router-dom"


const toolbar=(props)=>{
    return (
    <Navbar bg="green" expand="lg" style={{"background":"rgb(200, 260, 93)"}} >
        <Navbar.Brand as={NavLink} to="/">Fresh-mart</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <NavigationItems />
</Navbar>
)}


export default toolbar


