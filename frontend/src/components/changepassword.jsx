import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';

function ChangePassword() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values:', values);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-center mb-4">
                <LockOutlined className="text-indigo-300 text-8xl" />
            </div>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form.Item
                            label={<span className="font-semibold text-gray-600">Current Password</span>}
                            name="currentPassword"
                            rules={[{ required: true, message: 'Please input your current password!' }]}
                        >
                            <Input.Password
                                placeholder="Enter your current password"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label={<span className="font-semibold text-gray-600">New Password</span>}
                            name="newPassword"
                            rules={[{ required: true, message: 'Please input your new password!' }]}
                        >
                            <Input.Password
                                placeholder="Enter your new password"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label={<span className="font-semibold text-gray-600">Confirm New Password</span>}
                            name="confirmNewPassword"
                            dependencies={['newPassword']}
                            rules={[
                                { required: true, message: 'Please confirm your new password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                placeholder="Confirm your new password"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24} className="text-right">
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="bg-indigo-300 hover:bg-indigo-400">
                                Change Password
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default ChangePassword;
