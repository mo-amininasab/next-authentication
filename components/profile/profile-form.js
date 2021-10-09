import React, { useRef } from 'react';

import classes from './profile-form.module.css';

function ProfileForm({ onChangePassword }) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // Todo: Add validation

    onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password" ref={newPasswordRef}>
          New Password
        </label>
        <input type="password" id="new-password" />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
