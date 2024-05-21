import React from 'react';

import { Form, Input, Button, Select, DatePicker, Row, Col, Upload } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, EditOutlined  } from '@ant-design/icons';
// import 'antd/dist/antd.css';
import 'tailwindcss/tailwind.css';
import ProfilePic from "../assets/profile.jpg";

const { TextArea } = Input;
const { Option } = Select;

function EditProfile() {
    return (
        <main className="bg-gray-100 flex items-center justify-center ">
            <div className="bg-white py-20 shadow-lg w-full rounded-xl">
                {/* <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">Edit your information here</h2> */}
                <Form layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col span={5}>
                            <Form.Item name="profilePic">
                                <div className="relative w-32 h-32 mx-auto">
                                    {/* Display profile picture */}
                                    <img
                                        className="w-full h-full rounded-full object-cover"
                                        src={ProfilePic}
                                        alt=""
                                    />
                                    {/* Edit button overlay */}
                                    <Upload className="absolute bottom-0 right-0">
                                        <Button
                                            className="bg-white text-gray-500 p-1 rounded-full shadow hover:bg-gray-200"
                                            icon={<EditOutlined />}
                                            style={{ 
                                                position: 'absolute', 
                                                bottom: '-2px', 
                                                right: '-2px',
                                                zIndex: 1 
                                            }}
                                        />
                                    </Upload>
                                </div>
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            {/* Second column for input fields */}
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Form.Item label={<span className="font-semibold text-gray-600">Nickname</span>} name="nickname">
                                        <Input prefix={<UserOutlined />} placeholder="Enter your nickname" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label={<span className="font-semibold text-gray-600">Username</span>} name="username">
                                        <Input prefix={<UserOutlined />} placeholder="Enter your username" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label={<span className="font-semibold text-gray-600">Email</span>} name="email">
                                        <Input prefix={<MailOutlined />} placeholder="Enter your email" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label={<span className="font-semibold text-gray-600">Phone</span>} name="phone">
                                        <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={9}>
                            {/* Third column for remaining input fields */}
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Form.Item label={<span className="font-semibold text-gray-600">Birthday</span>} name="birthday">
                                        <DatePicker className="w-full" placeholder="Select your birthday" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label={<span className="font-semibold text-gray-600">Gender</span>} name="gender">
                                        <Select placeholder="Select your gender" className="w-full">
                                            <Option value="F">Female</Option>
                                            <Option value="M">Male</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label={<span className="font-semibold text-gray-600">Address</span>} name="address">
                                        <Input prefix={<HomeOutlined />} placeholder="Enter your address" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label={<span className="font-semibold text-gray-600">Bio</span>} name="bio">
                                        <TextArea rows={4} placeholder="Tell us about yourself" />
                                    </Form.Item>
                                </Col>
                                <Col span={24} className="text-right">
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="w-32 bg-blue-500">
                                            Edit
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    );
}

export default EditProfile;
