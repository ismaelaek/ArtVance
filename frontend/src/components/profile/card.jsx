import React, { useState } from 'react';
import ProfilePic from "../../assets/profile.jpg";
import BackgroundPic from "../../assets/background.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { AppstoreOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTab } from '@/storage/profileSlice';

function Card() {
    const dispatch = useDispatch();
    const [current, setCurrent] = useState('1');
    const selectedTab = useSelector(state => state.profile.profileTab);
    

    const handleClick = (e) => {        
        setCurrent(e.key);
        dispatch(setSelectedTab(e.key));
    };

    const menu = (
        <Menu>
            <Menu.Item key="editInfo" icon={<FontAwesomeIcon icon={faCamera} />}>
                Edit info
            </Menu.Item>
        </Menu>
    );

    return (
        <div
            style={{
                width: "100%",
            }}
        >
            <div
                style={{
                    fontFamily: "'Poppins', sans-serif",
                    width: "100%",
                    position: "relative",
                }}
            >
                {/* Background pic */}
                <div>
                    <img
                        style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "10px",
                        }}
                        src={BackgroundPic}
                        alt=""
                    />
                    {/* Edit cover button */}
                    <button
                        style={{
                            position: "absolute",
                            top: "50%",
                            right: "20px",
                            zIndex: 1,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            border: "none",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            cursor: "pointer",
                            color: "#fff",
                            transition: "transform 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = "scale(1)";
                        }}
                    >
                        <FontAwesomeIcon icon={faCamera} />
                        {' '}{' '} Edit cover
                    </button>
                </div>

                {/* Profile pic and name */}
                <div
                    style={{
                        position: "absolute",
                        top: "58%",
                        left: "20px",
                        transform: "translateY(-50%)",
                        display: "flex",
                        alignItems: "center",
                        color: "#fff",
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            borderRadius: "50%",
                            border: "3px solid #fff",
                            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                            width: "100px",
                            height: "100px",
                            overflow: "hidden",
                            marginRight: "10px",
                            transition: "background-color 0.9s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.querySelector('.camera-icon').style.visibility = "visible";
                            e.currentTarget.style.background = "rgba(0, 0, 0, 0.5)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.querySelector('.camera-icon').style.visibility = "hidden";
                            e.currentTarget.style.background = "none";
                        }}
                    >
                        {/* Profile picture */}
                        <img
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                            src={ProfilePic}
                            alt=""
                        />
                        {/* Camera icon for editing picture */}
                        <div
                            className="camera-icon"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                background: "rgba(0, 0, 0, 0.5)",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                visibility: "hidden",
                                fontSize: "28px",
                                cursor: "pointer",
                            }}
                        >
                            <FontAwesomeIcon icon={faCamera} />
                        </div>
                    </div>
                    <h1>Ahmed Mouhssine</h1>
                </div>

                {/* Bio */}
                <div
                    style={{
                        paddingTop: "50px",
                        color: "#000",
                        paddingLeft: "20px",
                    }}
                >
                    <p>From Egypt <br />55 yo<br />Work at Mchi So9ek</p>
                </div>
            </div>
            {/* navbar */}
            <div>
                <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="1">
                        Time line
                    </Menu.Item>
                    <Menu.Item key="2">
                        About
                    </Menu.Item>
                    <Menu.Item key="3" icon={<AppstoreOutlined />}>
                        Friend (5)
                    </Menu.Item>
                    <Menu.Item key="ellipsis" icon={<EllipsisOutlined />}>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            </a>
                        </Dropdown>
                    </Menu.Item>
                </Menu>
            </div>
            <div className='data'>
                <ContentContainer selectedTab={ selectedTab }/>
            </div>
        </div>
    );
}

export default Card;

const ContentContainer = ({ selectedTab }) => {
	switch (selectedTab) {
		case "1":
			return <h1>Timeline</h1>;
		case "2":
			return <h1>About</h1>;
		case "3":
			return <h1>Friends</h1>;
		default:
			return null;
	}
};
