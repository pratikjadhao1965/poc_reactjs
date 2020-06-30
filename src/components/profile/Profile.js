//component handles profile page ,changes profile details

import React ,{useEffect,useState} from "react"
import classes from "./Profile.css"
import axios from "axios"
import {connect}  from "react-redux"
import Addresses from "./addresses/Addresses"
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import {logoutAll,setProfile,updateProfile} from "../../store/actions/auth"
import {Spinner} from "react-bootstrap"
import Input from "../UI/Input/Input"
import UpdatePassword from "./updatePassword/UpdatePassword"
import {checkValidity} from "../../utility/validation"


const profile=props=>{

    const [showAddresses,setShowAddresses]=useState(false)
    const [showProfile,setShowProfile]=useState(false)
    const [showChangePassword,setShowChangePassword]=useState(false)
    const [profilePhoto,setProfilePhoto]=useState(null)
    const [formIsValid,setFormIsValid]=useState(false)

    const [controls,setControls]=useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value:"",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email:{
            elementType:"input",
            elementConfig:{
                type:"email",
                placeholder:"Email address"
            },
            value:"",
            validation:{
                required:true,
                isEmail:true
            },
            valid:false,
            touched:false
        },
        phone:{
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Phone'
            },
            value:"",
            validation: {
                required: true,
                minLength:8,
                maxLength: 12,
                isNumeric: true
            },
            valid: false,
            touched: false
        },
        age:{
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Age'
            },
            value: "",
            validation: {
                required: true,
                isNumeric:true
            },
            valid: false,
            touched: false
        },
        gender:{
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'male', displayValue: 'Male'},
                    {value: 'female', displayValue: 'Female'},
                    {value: 'other', displayValue: 'Other'}
                ]
            },
            value:"male",
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
                     
    useEffect(()=>{
        props.onSetProfile(props.token)
    },[])

    const {profile}=props
    useEffect(()=>{
        if(profile){
        setProfilePhoto(`${process.env.REACT_APP_URL}/api/users/${profile._id}/avatar`)
        let updatedControls={...controls}
            for(let key in profile){
              
                if(key==="name"||key==="email"||key==="phone"||key==="age"||key==="gender"){
                updatedControls={
                    ...updatedControls,
                    [key]:{
                        ...updatedControls[key],
                        value:profile[key].toString(),
                        valid:checkValidity(profile[key].toString(),controls[key].validation),
                        touched:true
                    }
                }
            }
            }
            let formIsValid = true;
            for (let inputIdentifier in updatedControls) {
                formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
            }
            setControls(updatedControls)
            setFormIsValid(formIsValid)
        }
    },[profile])

    //changes/sets profile photo of user
    const addProfilePhotoHandler=(event)=>{
        if(props.isAuthenticated){
        const formData=new FormData()
        formData.append("avatar",event.target.files[0])
        axios.post(`${process.env.REACT_APP_URL}/api/users/me/avatar`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }).then(response=>{
                setProfilePhoto(`${process.env.REACT_APP_URL}/api/users/${response.data._id}/avatar?${Math.random()}`)
            })
            .catch((err)=>{
                alert("Something Went Wrong")
            })
        }
    }

    const updateProfileHandler=()=>{
        if(props.isAuthenticated){
            props.onUpdateProfile(controls.name.value,controls.email.value,controls.phone.value,controls.age.value,controls.gender.value)
            }
    }
  
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
                
    let profileInfo=<div style={{"padding":"25%","paddingTop":"20%"}}><Spinner animation="border" variant="success" /></div>
    if(profile){
        profileInfo=<div className={classes.profile}>
                        <div className={classes.profilecard}>
                        <img alt="" src={profilePhoto} />
                                <div >
                                    <h1>{controls.name.value}</h1>
                                    <p>{controls.email.value}</p>
                                    <div className={classes.inputWrapper}>
                                        <input className={classes.fileInput} type="file" name="file1" 
                                            onChange={addProfilePhotoHandler}/>
                                        <AddAPhoto style={{'color':"green"}}/>
                                    </div>
                                </div>
                            </div>
                            
                               
                        {showProfile?
                            <div className={classes.profile}>
                                
                                <h4>Profile</h4>
                                {props.error?<span style={{"color":"red"}}>{props.error}</span>:null}
                                {props.message?<span style={{"color":"green"}}>{props.message}</span>:null}
                                    {form}
                                <button className={classes.button} disabled={!formIsValid} onClick={()=>updateProfileHandler()}>
                                    SAVE
                                </button>
                            </div>:null
                        }
                        {showChangePassword?
                            <div className={classes.profile}>
                                <h4>Set Password</h4>
                                <UpdatePassword/>
                            </div> :null
                        }
                        {showAddresses?
                            <Addresses clicked={()=>setShowAddresses(false)}/>
                             :null}
                        </div>
    }

    return(<div className={classes.profilePage}> 

            <h1>My Profile</h1>
            <div className={classes.main}>
            <div className={classes.sideMenu}>
                <button onClick={()=>setShowProfile(!showProfile)}>Profile</button>{''}
                {''}<button onClick={()=>setShowChangePassword(!showChangePassword)}>Change Password</button>
                {''}<button onClick={()=>setShowAddresses(!showAddresses)}>Addresses</button>
                {" "}<button onClick={()=>props.onLogoutAll()}>Logout All</button>
                
            </div>
            {profileInfo}
            </div>
        </div>
    )
}

const mapStateToProps=state=>{
    return{
        token:state.authState.token,
        isAuthenticated:state.authState.token!==null,
        profile:state.authState.profile,
        error:state.authState.error,
        message:state.authState.message
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onLogoutAll:()=>dispatch(logoutAll()),
        onSetProfile:()=>dispatch(setProfile()),
        onUpdateProfile:(name,email,phone,age,gender)=>dispatch(updateProfile(name,email,phone,age,gender))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(profile)










