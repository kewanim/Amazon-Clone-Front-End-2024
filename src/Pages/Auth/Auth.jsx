import React, { useState, useContext } from 'react';
import classes from './SignUp.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../Utility/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { DataContext } from '../../Components/Data Provider/DataProvide';
import {ClipLoader} from 'react-spinners';
import { Type } from '../../Utility/action.type';

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState({
        signIn: false,
        signUp: false
    });

    const [{ user }, dispatch] = useContext(DataContext);
    const navigate = useNavigate();
    const navStateData = useLocation();
    console.log(navStateData);


    //console.log(user);

    const authHandler = async (e) => {
        e.preventDefault();
        console.log(e.target.name);

        if (e.target.name === "signin") {
            //firebase auth
            setLoading({...loading, signIn:true})
            signInWithEmailAndPassword(auth, email, password)
                .then((userInfo) => {
                    dispatch({
                        type: "SET_USER",
                        user: userInfo.user,
                    });
                    setLoading({...loading, signIn:false});
                    navigate(navStateData?.state?.redirect || "/");
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading({...loading, signIn:false})
                });
        } else {
            setLoading({...loading, signUp:true})
            createUserWithEmailAndPassword(auth, email, password)
                .then((userInfo) => {
                    dispatch({
                        type: "SET_USER",
                        user: userInfo.user,
                    });
                    setLoading({...loading, signUp:false})
                    navigate(navStateData?.state?.redirect || "/");
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading({...loading, signUp:false})
                });
        }
    };

    return (
        <section className={classes.login}>
            {/* Logo */}
            <Link to={"/"}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                    alt="Amazon Logo"
                />
            </Link>

            {/* Form */}
            <div className={classes.login_container}>
                <h1>Sign In</h1>
                {navStateData?.state?.msg && (
                    <small
                        style={{
                            padding: "5px",
                            textAlign: "center",
                            color: "red",
                            fontWeight: "bold",
                        }}>
                        {navStateData?.state?.msg}
                    </small>
                )}
                <form action="">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={authHandler}
                        name="signin"
                        className={classes.login_signInButton}
                    >
                        {loading.signIn? (
                            <ClipLoader color ="black" size={15}></ClipLoader>
                            ):(
                                "Sign In"
                        )}
                    </button>
                </form>

                {/* Agreement */}
                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                {/* Create Account Button */}
                <button
                    type="submit"
                    onClick={authHandler}
                    name="signup"
                    className={classes.login_registerButton}
                >
                    {loading.signUp? (
                            <ClipLoader color ="black" size={15}></ClipLoader>
                            ):(
                                "Create a new Amazon Account"
                        )}
                </button>

                {/* Error Message Displayed Only Below the Buttons */}
                {error && (
                    <small style={{ paddingTop: "10px", color: "red", display: "block" }}>
                        {error}
                    </small>
                )}
            </div>
        </section>
    );
}

export default Auth;



// import React, { useState, useContext } from 'react'
// import classes from './SignUp.module.css'
// import { Link } from 'react-router-dom'
// import { auth } from '../../Utility/firebase';
// import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
// import {DataContext} from '../../Components/Data Provider/DataProvide'


// function Auth() {

//     const[email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");

//     const [{user}, dispatch] = useContext(DataContext)

//     const authHandler = async(e)=>{
//         e.preventDefault();
//         console.log(e.target.name);
//         if(e.target.name == "signin"){
//             // firebase auth
//             signInWithEmailAndPassword(auth, email, password)
//             .then((userInfo)=>{
//             console.log(userInfo);
//             dispatch({
//                 type:Type.SET_USER,
//                 user:userInfo.user
//             })
//         }).catch((err)=>{
//             console.log(err)
//         })
//         }else{
//             createUserWithEmailAndPassword (auth, email, password)
//             .then ((userInfo)=>{
//                 console.log(userInfo);
//                 dispatch({
//                     type:Type.SET_USER,
//                     user:userInfo.user
//             })
//             .catch((err)=>{
//                 console.log(err);
//             });
//         }
//     };
    


//     // console.log(password, email);

//     return <section className={classes.login}>
//                     {/* Logo */}
//                 <Link>
//                     <img 
//                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" 
//                     alt=""/>
//                 </Link>

//                     {/* Form */}
//                     <div className={classes.login_container}>
//                         <h1>Sign In</h1>
//                         <form action="">
//                             <div>
//                                 <label htmlFor="email">Email</label>
//                                 <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" />
//                             </div>
//                             <div>
//                                 <label htmlFor="password">Password</label>
//                                 <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" />
//                             </div>
//                             <button type="submit" 
//                             onClick={authHandler} 
//                             name="signin"
//                             className={classes.login_signInButton}>
//                                 Sign In
//                             </button>
//                         </form>

//                         {/* Agreement */}
//                         <p>
//                             By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interes-Based Ads Notice.
//                         </p>

//                         {/* Create Account Button */}
//                         <button type="submit" 
//                         onClick={authHandler} 
//                         name="signup"
//                         className={classes.login_registerButton}>
//                             Create a new Amazon Account
//                         </button>
//                     </div>
//             </section>
// };

// export default Auth