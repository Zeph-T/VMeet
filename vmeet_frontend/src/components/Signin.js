import React,{useState,useContext} from 'react';
import {Link,useHistory } from 'react-router-dom';
import {UserContext} from '../App';
import M from 'materialize-css';
import {api} from '../utilities';
import ReactLogo from '../svgs/homePage.svg';



const SignIn = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPassword] = useState("")
    const[email,setEmail] = useState("")
    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
             M.toast({html:"invalid Email" , classes:"#43a047 red darken-1"})
            return
            }
        fetch(api.BASE_URL + "/studentlogin",{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              password,
              email
          }) 
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error)
            {
                M.toast({html: data.error, classes:"#e53935 red darken-1"})
            }
            else{
                localStorage.setItem("jwt",data.user.authToken)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"signed in successfully" , classes:"#43a047 green darken-1"})
                history.push('/')
            }
        }).catch(err=>
            console.log(err)
        )
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field" >
                <h2 className="instafamheading">V-meet</h2>
                <input
                type='text'
                placeholder='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                type='password'
                placeholder='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                
            <button className="btn waves-effect waves-light #091353 blue darken-1"
            onClick={()=>PostData()} 
            >
                Login
            </button>
            <h5>
                <Link to="/signup">Don't have an account ?</Link>
            </h5>
        </div>
        <img src={ReactLogo} alt="React Logo" />
        </div>
    )

}

export default SignIn