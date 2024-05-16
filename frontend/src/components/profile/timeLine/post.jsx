import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { FaRegHeart, FaRegComment, FaHeart, FaRegBookmark, FaBookmark    } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import ProfilePic from '../../../assets/profile.jpg';
import Poste1 from '../../../assets/poste1.jpg';

const { TextArea } = Input;
const { Item } = Form;

function Post() {
    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
    };
    const [bookmarked, setBookmarked] = useState(false);

    const handleBookmarkClick = () => {
        setBookmarked(!bookmarked);
    };
    const profilePicStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginRight: '10px',
    };

    return (

        
        <div style={{ marginLeft: "20px", marginRight: "50px", marginTop: '50px' }}>
            <hr style={{ borderColor: 'gray', width: '100%', marginBottom: '10px' }} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={ProfilePic} alt="Profile" style={profilePicStyle} />
                <div style={{ marginLeft: '10px', marginTop: "20px" }}>
                    <h6 style={{ fontSize: '18px', marginBottom: '2px', color: 'black' }}>Ahmed Mouhssine</h6>
                    <p style={{ fontSize: '14px', color: 'gray' }}>2020-05-19</p>
                </div>
            </div>

            <div style={{marginTop:'8px', marginBottom:"20px" }}>
                <p style={{ fontSize: '17px', fontWeight: 'normal', color: 'black', marginBottom: '10px'}}>This is a Caption of this post...</p>
                <img
                    src={Poste1}
                    alt="Post"
                    style={{ width: "100%", maxHeight: "500px", height: "auto" , borderRadius:"20px" }}
                />
            </div>

            <hr style={{ borderColor: 'gray', width: '100%', marginBottom: '10px' }} />

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }} className='flex items-center justify-between'>
                <div>
                    <Button 
                         icon={liked ? <FaHeart color="#e84393" /> : <FaRegHeart />} 
                        onClick={handleLikeClick} 
                        style={{border: "none",fontSize: "20px" }} 
                    />
                    <Button 
                        icon={<FaRegComment  />} 
                        style={{ border: "none",fontSize: "20px" }} 
                    />
                    <Button 
                        icon={<IoPaperPlaneOutline />} 
                        style={{ border: "none",fontSize: "20px" }} 
                    />
                </div>
                <Button 
                    icon={bookmarked ? <FaBookmark color="#0984e3" /> : <FaRegBookmark />}
                    onClick={handleBookmarkClick} 
                    style={{ border: "none",fontSize: "20px" }} 
                />
            </div>

            <hr style={{ borderColor: 'gray', width: '100%', marginTop: '10px' }} />

            <Form>
                <div style={{ display: 'flex', alignItems: 'center', marginTop:'10px' }}>
                    <img
                        style={profilePicStyle}
                        src={ProfilePic}
                        alt="Profile"
                    />
                    <Item
                        name="commentContent"
                        className="flex-1 mt-4"
                    >
                        <TextArea
                            className='border-none outline-none text-lg font-semibold rounded-full bg-gray-200 pl-6 pt-2 pb-2 pr-5 text-gray-600'
                            placeholder="Write a comment..."
                            autoSize={{ minRows: 1, maxRows: 3 }}
                        />
                    </Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-blue-500 ml-7 p-4 rounded-full"
                        icon={<SendOutlined />}
                    />
                </div>
            </Form>

        </div>
    );
}

export default Post;
