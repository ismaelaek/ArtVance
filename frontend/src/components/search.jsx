import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "@/storage/usersSlice";
import { getAllPosts } from "@/storage/postsSlice";
import { FaUser } from "react-icons/fa";
import { BsFilePost } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { LiaHandPointRight } from "react-icons/lia";


const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const Search = () => {
	const dispatch = useDispatch();
	const { users, usersIsLoading } = useSelector((state) => state.users);
	const { allPosts, postsIsLoading } = useSelector((state) => state.posts);
	const query = useQuery();
	const searchTerm = query.get("q");
	const [resultsUsers, setResultsUsers] = useState([]);
	const [resultsPosts, setResultsPosts] = useState([]);

	useEffect(() => {
		dispatch(getUsers());
		dispatch(getAllPosts());
	}, [dispatch]);

	useEffect(() => {
		if (searchTerm) {
			setResultsUsers(
				users
					.filter(
						(user) =>
							user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
							user.username.toLowerCase().includes(searchTerm.toLowerCase())
					)
					.slice(0, 9)
			);
			setResultsPosts(
				allPosts
					.filter((post) =>
						post.caption.toLowerCase().includes(searchTerm.toLowerCase())
					)
					.slice(0, 8)
			);
		} else {
            setResultsUsers([]);
            setResultsPosts([]);
		}
    }, [searchTerm, users]);
    
    if (resultsUsers.length === 0 && resultsPosts.length === 0) {
        return (
            <div className="w-full flex justify-center">
                <p>No results found</p>
            </div>
        )
    }
			return (
				<main>
					<div className="flex gap-2 items-center mb-3 text-2xl">
						<FaUser /> <span>Artists</span>
					</div>
					<div className="grid grid-cols-3 gap-x-4">
						{resultsUsers.map((user) => (
							<UserCard key={user.id} user={user} />
						))}
					</div>
					<div className="flex gap-2 items-center mb-3 text-2xl">
						<BsFilePost /> <span>Posts</span>
					</div>
					<div className="grid grid-cols-2 gap-4">
						{resultsPosts.map((post) => (
							<div className=" rounded-xl bg-white p-3">
								<p>{post.caption}</p>
								<p>
									by : "
									<Link
										to={`/profile/${post.userId}`}
										className="no-underline text-gray-700 p-0 m-0">
										{users.map((user) => {
											if (user.id === post.user_id) {
												return user.nickname;
											}
										})}
									</Link>
									"
								</p>
								<Link className="flex gap-1 no-underline items-center">
									<span>View post </span>
									<LiaHandPointRight />
								</Link>
							</div>
						))}
					</div>
				</main>
			);
};

export default Search;

const UserCard = ({ user }) => {
	return (
		<div className="flex gap-3 items-center bg-white rounded-xl p-3 mb-3">
			<Avatar src={user.photo} size={50} alt="profile picture" />
			<div>
				<Link
					to={`/profile/${user.id}`}
					className="no-underline text-black p-0 m-0 text-lg">
					{user.nickname}
				</Link>
				<p className="p-0 m-0 text-sm text-gray-500">{user.username}</p>
			</div>
		</div>
	);
};
