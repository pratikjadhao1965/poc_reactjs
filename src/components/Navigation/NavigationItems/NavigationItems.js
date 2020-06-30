//decides menu bar contents

import React from "react"
import {logout} from "../../../store/actions/auth"
import {connect} from "react-redux"
import {AccountCircle,ShoppingBasket} from "@material-ui/icons"
import Badge from '@material-ui/core/Badge';
import {Navbar,NavDropdown,Nav,Form,FormControl} from "react-bootstrap"
import { searchItems } from "../../../store/actions/item"
import {NavLink} from "react-router-dom"

const navigationItems=(props)=>{
    let links=(
    <React.Fragment>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/auth">Authentication</Nav.Link>  
              <Nav.Link as={NavLink} to="/cart" >
              cart<Badge badgeContent={props.totalItem} color="secondary" style={{marginLeft:10}}><ShoppingBasket /></Badge>
                  </Nav.Link> 
              </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" value={props.searchKey} className="mr-sm-2" onChange={(event)=>props.onSearchItems(event.target.value)}/>
              
            </Form>
          </Navbar.Collapse>
    </React.Fragment >
    )

    if(props.isAuthenticated){
        links=(
       
          <React.Fragment>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    <NavDropdown title="More" id="basic-nav-dropdown">
                      <NavDropdown.Item as={NavLink} to="/profile">Profile <AccountCircle/></NavDropdown.Item>
                      
                      <NavDropdown.Item as={NavLink} to="/orders">Orders</NavDropdown.Item>
                      
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={NavLink} to="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
            <Nav.Link as={NavLink} to="/cart" >
                cart<Badge badgeContent={props.totalItem} color="secondary" style={{marginLeft:10}}><ShoppingBasket /></Badge>
            </Nav.Link> 

          </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" value={props.searchKey} className="mr-sm-2" onChange={(event)=>props.onSearchItems(event.target.value)}/>
            </Form>
      </Navbar.Collapse>
        </React.Fragment>
        )
    }
    return links
}
const mapToStateProps=state=>{
    return{
      isAuthenticated:state.authState.token!==null,
      totalItem:state.cartState.totalItems,
      searchKey:state.cartState.searchKey
    }
  }
  
  const mapDispatchToProps=(dispatch)=>{
    return{
        onLogout:()=>dispatch(logout()),
        onSearchItems:(key)=>dispatch(searchItems(key))
    }
  }

export default connect(mapToStateProps,mapDispatchToProps)(navigationItems);

