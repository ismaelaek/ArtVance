import React from 'react';
import ProfilePic from '../../assets/profile.jpg';

function Friends() {
    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Friends (2)</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {/* card 1 of friends */}
            <div className="bg-white p-4 border-2 border-gray-100 mt-2 rounded-xl">
                <div className="flex items-center mb-4">
                    <div className="w-11 h-11 flex justify-center items-center rounded-full overflow-hidden">
                        <img src={ProfilePic} alt="Profile" className="w-full" />
                    </div>
                    <div className="ml-4">
                        <p className="text-lg">Ahmed Mouhssine</p>
                        <p className="text-sm text-gray-500">Cairo, Egypt</p>
                    </div>
                </div>
                <div className="w-full flex justify-evenly text-xl">
                    <button className="btn btn-primary w-2/5">
                        Message
                    </button>
                    <button className="btn btn-outline-primary w-2/5">
                        Unfollow
                    </button>
                </div>
            </div>

            {/* card 2 of friends */}
            <div className="bg-white p-4 border-2 border-gray-100 mt-2 rounded-xl">
                <div className="flex items-center mb-4">
                    <div className="w-11 h-11 flex justify-center items-center rounded-full overflow-hidden">
                        <img src={ProfilePic} alt="Profile" className="w-full" />
                    </div>
                    <div className="ml-4">
                        <p className="text-lg">Ahmed Mouhssine</p>
                        <p className="text-sm text-gray-500">Cairo, Egypt</p>
                    </div>
                </div>
                <div className="w-full flex justify-evenly text-xl">
                    <button className="btn btn-primary w-2/5">
                        Message
                    </button>
                    <button className="btn btn-outline-primary w-2/5">
                        Unfollow
                    </button>
                </div>
            </div>

        </div>
        </div>
    );
}

export default Friends;
