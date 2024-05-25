import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./profile/timeLine/post";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

function SavePosts() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [error, setError] = useState(null); // Initialize error state
  // const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();
  const logged = JSON.parse(localStorage.getItem('loggedUser'))


  // useEffect(() => {
	// 	const userToken = Cookies.get("userToken");
	// 	if (!userToken) {
	// 		navigate("/login");
	// 	} else {

	// 		//! kayjib user li dar login mn local storage 
	// 		const logged = JSON.parse(localStorage.getItem("loggedUser"));
	// 		setLoggedUser(logged);

			
	// 	}
	// }, [navigate]);
  
  useEffect(() => {
    const fetchSavedPosts = async () => {
    
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/save/saved-posts/${logged.id}`, 
          {
            headers: {
              'Authorization': `Bearer ${Cookies.get('userToken')}`
            },
          }
        );
        setSavedPosts(response.data);
      } catch (error) {
        console.error('Error getting saved posts:', error);
        setError(error); // Set the error state
      }
    };
    

    fetchSavedPosts();
  }, []); // Empty dependency array means it will only run once on mount

  // if (!logged) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <main className=" flex justify-center "
    >
			<div className=" w-2/3">
				{savedPosts.map((post) => (
					<Post key={post.id} post={post} logged={logged} isBookMarked={true} />
				))}
      </div>
		</main>
	);
}

export default SavePosts;
