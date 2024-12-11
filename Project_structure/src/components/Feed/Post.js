import React from 'react';

const Post = ({ post }) => {
  return (
    <div className="post bg-white p-4 rounded shadow mb-4">
      <h3 className="font-bold text-lg">{post.userName}</h3>
      <p className="text-gray-700">{post.text}</p>
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-full h-auto mt-2 rounded"
        />
      )}
      <p className="text-sm text-gray-500 mt-2">
        {post.timestamp?.toDate().toLocaleString()}
      </p>
    </div>
  );
};

export default Post;
