import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const sidebar =(props)=>{
  const classes = useStyles();
  let icon;

    const catagories=props.catagories.map(catagory=>{
                            return <li key={catagory}>
                            <Chip
                              icon={icon}
                              label={catagory}
                              onClick={()=>props.clicked(catagory)}
                              className={classes.chip}
                            />
                          </li>
                })
    return(
        <ul className={classes.root}>
          <li key="all"><Chip
           icon={icon}
          label="All"
          onClick={()=>props.clicked("all")}
          className={classes.chip}
        /></li>
      {catagories}
    </ul>
  )
}

export default sidebar