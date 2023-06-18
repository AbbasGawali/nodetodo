import React, { useContext } from 'react'
import { Context } from '../main'
import { Link } from 'react-router-dom'
import axios from "axios";
import { server } from '../main';
import toast from "react-hot-toast";

const Header = () => {
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
    console.log(isAuthenticated);

    const logoutHandler = async (e) => {
        setLoading(true);

        e.preventDefault();
        try {

            const data = await axios.get(`${server}/users/logout`, {
                withCredentials: true,
            })

            if (!data.data.success) {
                // console.log("data success " + data.data.success);
                setLoading(false);
                toast.error(data.data.message);
                return setIsAuthenticated(true);

            } else {
                // console.log(data);
                // console.log("data success else " + data.data.success);
                setLoading(false);
                toast.success(data.data.message);
                setIsAuthenticated(false);
            }
        } catch (err) {
            setLoading(false);
            toast.error("Some error occured");
            setIsAuthenticated(true);
            console.log(err);

        }
    };


    return (
        <nav className='header'>
            <div className="logo">
                <h2><Link to={"/"} >Todo App</Link></h2>

            </div>

            <article>
                <Link to={"/"} >Home</Link>
                <Link to={"/profile"} >Profile</Link>
                {isAuthenticated ?
                    <button to={"/logout"} disabled={loading} onClick={logoutHandler} >Logout</button> :
                    <Link to={"/login"} >Login</Link>}


            </article>
        </nav>
    )
}

export default Header