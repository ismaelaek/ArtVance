import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message, Avatar } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

const UsersReports = () => {
  const [dataSource, setDataSource] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportedUsers = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/report/top-users`, 
          {
            headers: {
              'Authorization': `Bearer ${Cookies.get('userToken')}`
            },
          }
        );

        const formattedData = response.data.map((item) => ({
          key: item.reported_user.id,
          photo: item.reported_user.photo,
          nickname: item.reported_user.nickname,
          email: item.reported_user.email,
          reports: item.total_reports,
        }));

        setDataSource(formattedData);
      } catch (error) {
        console.error('Error getting reported users:', error);
        setError(error);
      }
    };

    fetchReportedUsers();
  }, []);

  const handleDelete = async (key) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${key}`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('userToken')}`
        },
      });
      message.success('User deleted successfully');
      setDataSource(dataSource.filter(item => item.key !== key));
    } catch (error) {
      message.error('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo) => (
        <Avatar src={photo} size={64} />
      ),
    },
    {
      title: 'Nickname',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Reports',
      dataIndex: 'reports',
      key: 'reports',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <div>
      <h2>High Report Users</h2>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default UsersReports;
