import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';

const CreatePost = () => {
  const { user } = useAuth();
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async () => {
    if (!image) return null;
    const imageRef = ref(storage, `posts/${user.uid}/${image.name}-${Date.now()}`);
    await uploadBytes(imageRef, image);
    return await getDownloadURL(imageRef);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const imageUrl = await handleImageUpload();
      await addDoc(collection(db, 'posts'), {
        text: postText,
        image: imageUrl || null,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        timestamp: serverTimestamp(),
      });
      setPostText('');
      setImage(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post bg-white p-4 rounded shadow mb-4">
      <form onSubmit={handlePostSubmit}>
        <textarea
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="w-full border rounded p-2 mb-2"
          rows="3"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-2"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
