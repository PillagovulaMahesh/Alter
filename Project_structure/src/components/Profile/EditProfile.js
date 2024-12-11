import React, { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';

const EditProfile = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = async () => {
    if (!photo) return user?.photoURL || null;

    const photoRef = ref(storage, `profile-pictures/${user.uid}`);
    await uploadBytes(photoRef, photo);
    return await getDownloadURL(photoRef);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const photoURL = await handlePhotoUpload();

      // Update Firebase Auth profile
      await updateProfile(user, { displayName, photoURL });

      // Update Firestore user document
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { displayName, photoURL });

      setLoading(false);
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile bg-white p-4 rounded shadow">
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
