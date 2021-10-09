import React, { useState, useEffect } from 'react';
import ProfileForm from './profile-form';

// ! in this case, useSession not work, use getSession.
// import { useSession, getSession } from 'next-auth/client';

import classes from './user-profile.module.css';

function UserProfile() {
  // Redirect away if NOT auth
  // const [isLoading, setIsLoading] = useState(true);
  // const [loadedSession, setLoadedSession] = useState();

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       // resets entire application
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  const onChangePasswordHandler = async (passwordData) => {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const data = await response.json();

    console.log((data));
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={}/>
    </section>
  );
}

export default UserProfile;
