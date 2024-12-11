// src/firebase/db.js

import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import auth from "./auth";

// Initialize Firestore
const db = getFirestore();

// Function to add a new post
export const addPost = async (text, images, video, userId) => {
  try {
    const newPost = {
      text,
      images,
      video,
      timestamp: new Date(),
      userId,
    };
    const postRef = await addDoc(collection(db, "posts"), newPost);
    return postRef.id;
  } catch (error) {
    console.error("Error adding post:", error.message);
    throw error;
  }
};

// Function to get posts with pagination (infinite scrolling)
export const getPosts = async (lastVisiblePost = null) => {
  try {
    const postsQuery = lastVisiblePost
      ? query(collection(db, "posts"), orderBy("timestamp", "desc"), startAfter(lastVisiblePost), limit(20))
      : query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(20));

    const querySnapshot = await getDocs(postsQuery);
    const posts = [];
    let lastVisible = null;

    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });

    // Get the last document for pagination
    if (!querySnapshot.empty) {
      lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    }

    return { posts, lastVisible };
  } catch (error) {
    console.error("Error getting posts:", error.message);
    throw error;
  }
};

// Function to get user posts by userId
export const getUserPosts = async (userId) => {
  try {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const userPosts = [];
    
    querySnapshot.forEach((doc) => {
      if (doc.data().userId === userId) {
        userPosts.push({ id: doc.id, ...doc.data() });
      }
    });

    return userPosts;
  } catch (error) {
    console.error("Error fetching user posts:", error.message);
    throw error;
  }
};

export default db;
