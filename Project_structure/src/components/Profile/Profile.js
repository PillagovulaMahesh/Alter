import React from 'react';
import { useAuth } from '../../context/AuthContext';
import EditProfile from './EditProfile';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page bg-gray-100 min-h-screen p-4">
      <div className="profile-header bg-white p-6 rounded shadow mb-4 flex items-center">
        <img
          src={user?.photoURL || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-lg font-bold">{user?.displayName || 'User'}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
      <EditProfile />
    </div>
  );
};

export default Profile;
