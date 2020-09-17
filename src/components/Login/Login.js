import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {userContext} from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);
function Login() {
  const [loggedInUser,setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [newUser , setNewUser] = useState(false);
  const[user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password:'',
    error:'',
    success:false,
    photoUrl:''
  });
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleClick=()=>{
    firebase.auth().signInWithPopup(provider)
    .then(res=>{
       const{displayName, email, photoURL}= res.user;
       const signedInUser ={
        isSignedIn: true,
        name: displayName,
        email:email ,
        photoUrl:photoURL
       }
       setUser(signedInUser)
    })
 }
 const handleClickSignOut=() => {
  firebase.auth().signOut()
  .then(res =>{
   const signedOutUser={
     isSignedIn: false,
     name:'',
     email:'',
     photoUrl:''
   }
   setUser(signedOutUser)
   
 })
}
const handleSubmit=(e) => {
  if(newUser && user.email && user.password){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res=>{
      const newUserInfo = {...user};
      newUserInfo.success =true;
      newUserInfo.error='';
      userUpdateName(user.name);
      setUser(newUserInfo);
      console.log("user info", res.user);
    })
    .catch(error =>{
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success=false;
      setUser(newUserInfo);
    });
  }
  if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res=>{
      const newUserInfo = {...user};
      newUserInfo.success =true;
      newUserInfo.error='';
      setLoggedInUser(newUserInfo);
      history.replace(from);
      setUser(newUserInfo);
    })
    .catch(error =>{
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success=false;
      setUser(newUserInfo);
    });
  }
  e.preventDefault()
}
const handleBlur = (e) => {
      
      let isFieldValid = true;
      if(e.target.name==="email"){
        isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      }
      if(e.target.name==="password"){
        const isPasswordLength = e.target.value.length>6;
        const isPasswordTest = /\d{1}/.test(e.target.value);
        isFieldValid = isPasswordLength && isPasswordTest;
      }
      if(isFieldValid){
        const setNewInfo = {...user};
        setNewInfo[e.target.name] = e.target.value;
        setUser(setNewInfo);
      }
}
 const userUpdateName = name => {
  var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  }).then(function() {
   console.log("user name set success");
  }).catch(function(error) {
    console.log(error);
  });
 }

  return (
    <div className="App">
      {
      user.isSignedIn ?<button onClick={handleClickSignOut}>Sign Out</button>
      :
      <button onClick={handleClick}>Sign In</button>
      }
     {
       user.isSignedIn &&<div>
       <h1>Welcome, {user.name}</h1>
       <p>Your email : {user.email}</p>
       <img src={user.photoUrl} alt=""></img>
       </div>
     }
     
    <br/><br/><br/>
     <form onSubmit={handleSubmit}>
       <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" />
       <label htmlFor="newUser">New User Sign Up</label>
       <br/><br/><br/>
       {
         newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Name"/>
       }
     
     <br/><br/>
     <input type="text" onBlur={handleBlur} name="email" placeholder="Email address"/>
     <br/> <br/>
     <input type="password" onBlur={handleBlur} name="password" placeholder="input password"/>
     <br/> <br/>
     {
       newUser  ?<input type="submit" value="Sign Up"/> : <input type="submit" value="Sign In"/>
     }
     
     </form>
      <p style={{ color:'red' }}> {user.error}</p>
      {
        user.success && <p style={{ color:'green' }}>user {newUser ? "created" : "Sign In"} successfully</p>
      }
   </div>
  );
}

export default Login;
