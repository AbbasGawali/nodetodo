import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';

import { Context, server } from '../main'
import TodoItem from '../components/TodoItem';
import { Navigate } from 'react-router-dom';
const Home = () => {

    const { isAuthenticated, setIsAuthenticated } = useContext(Context);


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState([]);
    const [refresh, setRefresh] = useState(false);


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const data = await axios.post(`${server}/tasks/new`, {
                title,
                description
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!data.data.success) {
                setLoading(false);
                return toast.error(data.data.message);


            } else {
                setLoading(false);
                toast.success(data.data.message);
                setTitle("");
                setDescription("");
                setRefresh(prev => !prev)
            }





        } catch (err) {
            // console.log("failed");
            // setLoading(false);
            // toast.error(error.response.data.message);
            console.log(err);
            setLoading(false);
            toast.error("Some error occured");
        }
    };

    const updateHandler = async (id) => {
        toast(id);
        try {
            console.log("isauthenticated : -");
            console.log(isAuthenticated);
            const data = await axios.put(`${server}/tasks/${id}`,
                {},
                {
                    withCredentials: true,
                }
            );
            toast.success(data.data.message);
            console.log(data);
            setRefresh(prev => !prev)

        } catch (err) {
            toast.error(err.response.data.message);
            console.log(err);
        }

    }
    const deleteHandler = async (id) => {

        // try {

        //     const data = await axios.delete(`${server}/tasks/${id}`,
        //         {},
        //         {
        //             withCredentials: true,
        //         }
        //     );

        //     if (!data.data.success) {
        //         console.log("not success");
        //         console.log(data);
        //         return toast.error(data.data.message);


        //     } else {
        //         console.log("success");
        //         toast.success(data.data.message);
        //     }

        // } catch (err) {
        //     toast.error(err.response.data.message);
        //     console.log(err);
        // }
        try {
            console.log("isauthenticated : -");
            console.log(isAuthenticated);

            // const data = await axios.delete(`${server}/tasks/${id}`,
            const data = await axios.delete(`${server}/tasks/${id}`,
                {
                    withCredentials: true,
                }
            );
            toast.success(data.data.message);
            console.log(data);
            setRefresh(prev => !prev)

        } catch (err) {
            toast.error(err.response.data.message);
            console.log(err);
        }

    }

    useEffect(() => {
        async function fetchData() {
            if (isAuthenticated) {

                const data = await axios.get(`${server}/tasks/getTask`, {
                    withCredentials: true,
                })


                if (!data.data.success) {
                    setLoading(false);
                    return toast.error(data.data.message);

                } else {
                    console.log(data);
                    setTask(data.data.tasks);
                }
            }else{
                toast.error("Login First");
            }
        }
        fetchData();

    }, [refresh])

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />
    }

    return (
        <>
            <div className="home">
                <div className='userform todoform'>
                    <form onSubmit={submitHandler} action="">
                        <input type="text" value={title} autoComplete="on" onChange={(e) => setTitle(e.target.value)} placeholder='Title' required minLength={5} />
                        <input type="text" value={description} autoComplete="on" onChange={(e) => setDescription(e.target.value)} placeholder='Description' required minLength={5} />
                        <div className="df">
                            <button disabled={loading} type='submit'>Add Task</button>
                        </div>

                    </form>
                </div>

                <h3 id='homemid'>task data here beleow</h3>
                <div className="taskData">

                    {task.map((i) => (
                        <TodoItem title={i.title}
                            isCompleted={i.isCompleted}
                            description={i.description}
                            updateHandler={updateHandler}
                            deleteHandler={deleteHandler}
                            id={i._id}
                            key={i._id} />

                    ))}
                </div>

            </div>
        </>
    )
}

export default Home