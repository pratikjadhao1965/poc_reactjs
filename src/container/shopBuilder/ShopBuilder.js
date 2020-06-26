import React from 'react';
import Items from "../../components/items/Items"
import {Jumbotron,Button} from "react-bootstrap"
import {connect} from "react-redux"
import {changeName} from "../../store/actions/auth"

const shopBuilder =(props)=> {
  
  const {name}=props

    return (
      <div >
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"/>
              <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
              <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
              {name? <Jumbotron>
              <h1>Hello, {name}</h1>
              <p>
                This is a simple shopping website.
              </p>
              <p>
                <Button variant="primary"  onClick={()=>props.onChangeName()}> Explore</Button>
              </p>
            </Jumbotron>:null}
       <Items/>
      </div>
    );
  }
const mapStateToProps=state=>{
  return {
    name:state.authState.name
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onChangeName:()=>dispatch(changeName())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(shopBuilder)
    