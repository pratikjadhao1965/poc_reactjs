import React  from "react"
import classes from "./Item.css"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {ShoppingCart,AddBox,IndeterminateCheckBox} from '@material-ui/icons';  
const item=props=>{
  let disabled=false
    if(props.res.stock<=0){
      disabled=true
    }
    let addtocart=<Button disabled={disabled} variant="outlined"
                    style={{"color":"#c66"}}
                    size="small"
                    className={classes.button}
                    startIcon={<ShoppingCart/>} onClick={props.addToCart}>
                  Add to Cart
                </Button>

    if(props.itemQuantity){
        addtocart=(<div  style={{"display":"flex"}}>
            <button className={classes.button} onClick={props.removed}><IndeterminateCheckBox /></button>
            <span style={{margin:4}}>{props.itemQuantity}inCart</span>
            <button className={classes.button} disabled={disabled} onClick={props.added}> <AddBox /></button>
            
           
           </div>)
    }
    return(
        <Card className={classes.root}>
            <CardActionArea>
             <CardMedia
                className={classes.media}
                  image={`${process.env.REACT_APP_URL}/api/items/${props.res._id}/image`}
                  title="Product Image"

                />
                <CardContent>
                  <Typography gutterBottom  >
                  <strong >{props.res.name}</strong>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
                  {props.res.price}Rs{'|'} {props.res.description}{disabled?<span>{"|"}<span style={{"color":"red","fontSize":"12px"}}>OutOfStock</span></span>:null}
                  </Typography>
                  
                </CardContent>
            </CardActionArea>
          <CardActions>
            
          {addtocart}
          
          </CardActions>
    </Card>
    )
}

export default item