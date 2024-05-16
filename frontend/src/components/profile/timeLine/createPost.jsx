import React from 'react';
import { Upload, Button, Form, Input } from 'antd';
import { VideoCameraOutlined, PictureOutlined } from '@ant-design/icons';
import ProfilePic from '../../../assets/profile.jpg';

const { Item } = Form;

function CreatePost() {
    const profilePicStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginRight: '10px',
        marginTop: '20px',
    };

    return (
        <Form>
            <div style={{ marginLeft:"20px", marginRight:"50px", display: 'flex', alignItems: 'center' }}>
                <img
                    style={profilePicStyle}
                    src={ProfilePic}
                    alt="Profile"
                />
                <Item
                    name="postContent"
                    className="flex-1 mt-5"
                >
                    <Input
                        className="border-none outline-none text-lg font-semibold rounded-full bg-gray-200 pl-5 pt-2 pb-2 pr-5 text-gray-600"
                        placeholder="What's happening ?"
                    />
                </Item>
            </div>

            <div style={{marginLeft:"20px",marginRight:"50px" }} className='flex items-center justify-between'>
                <div className="flex">
                    <Upload accept="video/*" showUploadList={false}>
                        <Button icon={<VideoCameraOutlined />} style={{ marginRight: '20px' }}>Video</Button>
                    </Upload>
                    <Upload accept="image/*" showUploadList={false}>
                        <Button icon={<PictureOutlined />} style={{ marginRight: '30px' }}>Photo</Button>
                    </Upload>
                </div>
                <Item>
                    <Button 
                        type="primary"
                        htmlType="submit"
                        className=" bg-blue-500 "
                    >
                        Poste
                    </Button>
                </Item>
            </div>
        </Form>
    );
}

export default CreatePost;
