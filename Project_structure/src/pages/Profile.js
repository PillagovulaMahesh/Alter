import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div>
      <h1>{user.displayName}'s Profile</h1>
      <img src={user.photoURL} alt="Profile" />
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
