import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./profile/timeLine/post";

function SavePosts() {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/saved-posts",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSavedPosts(response.data);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };
    fetchSavedPosts();
  }, []);
  return (
    <div>
      <h1>Saved Posts</h1>
      {savedPosts.map((post) => (
        <Post key={post.id} post={post} logged={logged} /> // Pass the logged user
      ))}
    </div>
  );
}

export default SavePosts;
