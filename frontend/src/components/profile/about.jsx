import React from 'react';
import { Card } from 'antd';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaMale, FaFemale, FaBirthdayCake } from 'react-icons/fa';
import { MdDriveFileRenameOutline } from 'react-icons/md';

function About({ user }) {
    const genderIcon =
			user.gender === "male" ? (
				<FaMale className="text-xl mr-4 text-blue-500" />
			) : (
				<FaFemale className="text-xl mr-4 text-pink-500" />
			);
    // commwntax
    return (
			<div className="p-4">
				<h1 className="text-2xl font-bold mb-4">About</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Card className="p-4">
						<div className="flex items-center">
							<MdDriveFileRenameOutline className="text-xl mr-4 text-gray-700" />
							<p className="m-0">{user.username}</p>
						</div>
					</Card>
					{user.phone && (
						<Card className="p-4">
							<div className="flex items-center">
								<FaPhone className="text-xl mr-4 text-blue-500" />
								<p className="m-0">{user.phone}</p>
							</div>
						</Card>
					)}
					{user.address && (
						<Card className="p-4">
							<div className="flex items-center">
								<FaMapMarkerAlt className="text-xl mr-4 text-red-500" />
								<p className="m-0">{user.address}</p>
							</div>
						</Card>
					)}
					<Card className="p-4">
						<div className="flex items-center">
							<FaEnvelope className="text-xl mr-4 text-green-500" />
							<p className="m-0">{user.email}</p>
						</div>
					</Card>
					<Card className="p-4">
						<div className="flex items-center">
							{genderIcon}
							<p className="m-0">{user.gender}</p>
						</div>
					</Card>
					{user.birthday && (
						<Card className="p-4">
							<div className="flex items-center">
								<FaBirthdayCake className="text-xl mr-4 text-yellow-500" />
								<p className="m-0">{user.birthday} </p>
							</div>
						</Card>
					)}
				</div>
			</div>
		);
}

export default About;
