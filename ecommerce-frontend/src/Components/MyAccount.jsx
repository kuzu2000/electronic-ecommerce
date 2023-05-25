import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAccount } from '../redux/api';
const MyAccount = () => {
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState(user.currentUser?.result?.username);
  const [email, setEmail] = useState(user.currentUser?.result?.email);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const userId = user.currentUser.result._id;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError(true);
      setSuccess(false);
    } else {
      updateAccount(dispatch, userId, {
        username,
        email,
        password,
      });
      setSuccess(true);
      setError(false);
    }
  };

  return (
    <div className="my-account-container">
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <p className="profile-error">
            Password and Password Confirm do not match
          </p>
        )}
        {success && (
          <p className="profile-success">Profile updated successfully!</p>
        )}
        <label id="label" htmlFor="username">
          Username
        </label>
        <input
          className="input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        />
        <label id="label" htmlFor="email">
          Email Address
        </label>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          disabled
        />
        <label id="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
        <label id="label" htmlFor="confirmPassword">
          Password Confirm
        </label>
        <input
          className="input"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          id="confirmPassword"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default MyAccount;
