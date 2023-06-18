import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import Loader from '../components/Loader';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);
  const [refresh, setRefresh] = useState(false);

  console.log("user details: ");
  console.log(user);


  useEffect(() => {

  }, [user]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }
  return (
    <>
      {
        loading ? <Loader /> :
          <>

            <div>User Details</div>
            <h1>{user?.name}</h1>
            <h1>{user?.email}</h1>
          </>
      }
    </>
  )
}

export default Profile