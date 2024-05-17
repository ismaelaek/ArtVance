import React from 'react';
import { Card } from 'antd';
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

function About() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">About</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                    <div className="flex items-center">
                        <FaPhone className="text-xl mr-4 text-blue-500" />
                        <p className="m-0">+420 755 666 214</p>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center">
                        <FaMapMarkerAlt className="text-xl mr-4 text-red-500" />
                        <p className="m-0">Egypt, Cairo</p>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center">
                        <FaEnvelope className="text-xl mr-4 text-green-500" />
                        <p className="m-0">ahmed.mouhssine@gmail.com</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default About;
