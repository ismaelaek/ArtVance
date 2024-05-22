import React, { useState } from 'react';
import { Anchor, Button, Modal } from 'antd';
import { FileProtectOutlined, LockOutlined, InfoCircleOutlined, UserOutlined, SolutionOutlined, SafetyCertificateOutlined, SafetyOutlined, PhoneOutlined } from '@ant-design/icons';
import ChangePassword from './changepassword'; 
const { Link } = Anchor;

function PrivacyPolicy() {
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <main className="bg-gradient-to-br flex items-center justify-center min-h-screen p-5">
            <div className="p-8 font-sans bg-white shadow-lg rounded-lg  ">
            <div className="bg-indigo-300 rounded-b-full text-center mb-20 p-20">
                    <FileProtectOutlined className="text-6xl text-white" />
                    <h1 className="text-4xl font-bold mt-4 text-white">Privacy Policy</h1>
                    <p className="text-lg text-white mt-2 italic">Effective May 22, 2024</p>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/4 mb-8 md:mb-0 md:mr-8">
                        <Anchor affix={false} className="space-y-3">
                            <Link href="#introduction" title={<> Introduction</>} className="text-purple-500 hover:text-purple-700" />
                            <Link href="#informationCollection" title={<> Information Collection</>} className="text-purple-500 hover:text-purple-700" />
                            <Link href="#informationUse" title={<> Information Use</>} className="text-purple-500 hover:text-purple-700" />
                            <Link href="#informationSharing" title={<> Information Sharing</>} className="text-purple-500 hover:text-purple-700" />
                            <Link href="#security" title={<> Security</>} className="text-purple-500 hover:text-purple-700" />
                            <Link href="#yourRights" title={<> Your Rights</>} className="text-purple-500 hover:text-purple-700" />
                            <Link href="#contactUs" title={<> Contact Us</>} className="text-purple-500 hover:text-purple-700" />
                        </Anchor>
                    </div>
                    <div className="w-full md:w-3/4">
                        <div id="introduction" className="mb-8">
                            <h2 className="text-3xl font-semibold mb-4 text-gray-600"><InfoCircleOutlined className="mr-2" />Introduction</h2>
                            <p className="text-gray-700">Welcome to Art Viens, a social media platform for artists to share their art. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.</p>
                        </div>
                        <div id="informationCollection" className="mb-8">
                            <h2 className="text-3xl font-semibold mb-4 text-gray-600"><UserOutlined className="mr-2" />Information Collection</h2>
                            <p className="text-gray-700">We may collect information about you in a variety of ways. The information we may collect via the app includes:</p>
                            <ul className="list-disc list-inside text-gray-700 ml-5">
                                <li>Personal Data: Name, email address, and other contact information.</li>
                                <li>Demographic Data: Age, gender, interests.</li>
                                <li>Usage Data: Information on how you use the app.</li>
                            </ul>
                        </div>
                        <div id="informationUse" className="mb-8">
                            <h2 className="text-3xl font-semibold mb-4 text-gray-600"><SolutionOutlined className="mr-2" />Information Use</h2>
                            <p className="text-gray-700">We use the information we collect in the following ways:</p>
                            <ul className="list-disc list-inside text-gray-700 ml-5">
                                <li>To provide and maintain our service.</li>
                                <li>To notify you about changes to our service.</li>
                                <li>To allow you to participate in interactive features of our service when you choose to do so.</li>
                                <li>To provide customer support.</li>
                                <li>To gather analysis or valuable information so that we can improve our service.</li>
                            </ul>
                        </div>
                        <div id="informationSharing" className="mb-8">
                            <h2 className="text-3xl font-semibold mb-4 text-gray-600"><SafetyOutlined className="mr-2" />Information Sharing</h2>
                            <p className="text-gray-700">We may share your information in the following situations:</p>
                            <ul className="list-disc list-inside text-gray-700 ml-5">
                                <li>With your consent.</li>
                                <li>For external processing with our partners and service providers.</li>
                                <li>For legal reasons, such as complying with laws and                                regulations.</li>
                            </ul>
                        </div>
                        <div id="security" className="mb-8">
                            <h2 className="text-3xl font-semibold mb-4 text-gray-600"><SafetyCertificateOutlined className="mr-2" />Security</h2>
                            <p className="text-gray-700">We use a combination of administrative, technical, and physical security measures to protect your personal information, including:</p>
                            <ul className="list-disc list-inside text-gray-700 ml-5">
                                <li>Encryption: We use SSL/TLS encryption to protect data transmitted to and from our app.</li>
                                <li>Access Controls: We implement strict access controls to restrict access to personal information to authorized personnel only.</li>
                                <li>Regular Audits: We conduct regular security audits and assessments to identify and mitigate potential vulnerabilities.</li>
                                <li>Data Anonymization: Where possible, we anonymize personal data to protect user identities.</li>
                                <li>Security Training: Our team undergoes regular training on best security practices to ensure they are up-to-date with the latest security protocols.</li>
                            </ul>
                            <p className="text-gray-700 mt-4">While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
                        </div>
                        <div id="yourRights" className="mb-8">
                            <h2 className="text-3xl font-semibold mb-4 text-gray-600"><LockOutlined className="mr-2" />Your Rights</h2>
                            <p className="text-gray-700">You have the following rights regarding your personal data:</p>
                            <ul className="list-disc list-inside text-gray-700 ml-5">
                                <li>Access your data.</li>
                                <li>Request correction of your data.</li>
                                <li>Request deletion of your data.</li>
                                <li>Object to the processing of your data.</li>
                            </ul>
                        </div>
                        <div id="changePassword" className="mb-8">
                            <h2 className="text-3xl font-semibold mb-4 text-gray-600">Change Password</h2>
                            <p className="text-gray-700">If you would like to change your password for enhanced security, you can do so by clicking the button below.</p>
                            <Button type="primary" icon={<LockOutlined />} onClick={showModal} className='bg-orange-200 text-gray-600 mt-4'>
                                Change Password
                            </Button>
                        </div>
                        <div id="contactUs" className="mb-8">
                            <h2 className="text-3xl font-semibold mb-4 text-gray-600"><PhoneOutlined className="mr-2" />Contact Us</h2>
                            <p className="text-gray-700">If you have any questions about this Privacy Policy, please contact us at:</p>
                            <p className="text-gray-700 mt-2">Email: <a href="mailto:support@yourapp.com" className="text-indigo-400 hover:underline">support@yourapp.com</a></p>
                        </div>
                        <div className="text-right mt-8 ">
                            <p className="text-gray-700 italic">Made with <span className="text-pink-500">♥</span> by the Art Viens Team</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="Change Password"
                visible={modalVisible}
                onCancel={handleCancel}
                footer={null}
                centered
                bodyStyle={{ padding: '20px' }}
            >
                <ChangePassword />
                </Modal>
        </main>
    );
}

export default PrivacyPolicy;

