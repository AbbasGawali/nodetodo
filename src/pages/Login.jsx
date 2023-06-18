import React, { useState, useContext } from 'react'
import { Context } from '../main'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios";
import { server } from '../main';
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log(email, password);
            const data = await axios.post(`${server}/users/login`, {
                email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            // console.log(data);
            // console.log(data.data.message);
            // console.log(data);
            if (!data.data.success) {
                // console.log("data success " + data.data.success);
                setLoading(false)
                toast.error(data.data.message);
                return setIsAuthenticated(false);
                
            } else {
                setLoading(false)
                // console.log(data);
                // console.log("data success else " + data.data.success);
                toast.success(data.data.message);
                setIsAuthenticated(true);
            }
        } catch (err) {
            setLoading(false)
            toast.error("Some error occured");
            setIsAuthenticated(false);
            console.log(err);

        }
    };


    if (isAuthenticated) {
        return <Navigate to={"/"} />
    }

    return (
        <div className='userform'>
            <form onSubmit={submitHandler} action="">
                <input type="email" value={email} autoComplete="on" onChange={(e) => setEmail(e.target.value)} placeholder='Email' required minLength={5} />
                <input type="password" value={password} autoComplete="on" onChange={(e) => setPassword(e.target.value)} placeholder='Password' required minLength={5} />
                <div className="df">
                    <button disabled={loading} type='submit'>Login</button>
                    <h4>Or</h4>
                    <Link to={"/register"}>Sign Up</Link>
                </div>

            </form>
        </div>

    )
}

export default Login