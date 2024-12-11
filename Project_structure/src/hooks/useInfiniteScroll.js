// src/hooks/useInfiniteScroll.js

import { useState, useEffect, useCallback } from 'react';
import { getPosts } from '../firebase/db'; // Import the getPosts function from your db.js

const useInfiniteScroll = () => {
  const [posts, setPosts] = useState([]); // Holds the fetched posts
  const [lastVisiblePost, setLastVisiblePost] = useState(null); // The last post for pagination
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [hasMore, setHasMore] = useState(true); // Tracks whether there are more posts to load

  // Function to load posts
  const loadPosts = useCallback(async () => {
    if (loading || !hasMore) return; // Prevent loading if already loading or no more posts
    
    setLoading(true);
    
    try {
      const { posts: newPosts, lastVisible } = await getPosts(lastVisiblePost);
      
      if (newPosts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]); // Append new posts to the state
        setLastVisiblePost(lastVisible); // Set last visible post for pagination
      } else {
        setHasMore(false); // If no posts, set hasMore to false
      }
    } catch (error) {
      console.error("Error loading posts:", error.message);
    } finally {
      setLoading(false);
    }
  }, [lastVisiblePost, loading, hasMore]);

  // Infinite scroll event listener
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 100) {
      loadPosts(); // Trigger loading more posts when scrolled near the bottom
    }
  };

  useEffect(() => {
    loadPosts(); // Initial load of posts when the component mounts
  }, [loadPosts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // Add scroll event listener

    // Clean up the event listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { posts, loading, hasMore };
};

export default useInfiniteScroll;
