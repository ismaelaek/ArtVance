import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message, Tag, Avatar } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

const PostsReports = () => {
  const [dataSource, setDataSource] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopReportedPosts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/report/top-posts`, 
          {
            headers: {
              'Authorization': `Bearer ${Cookies.get('userToken')}`
            },
          }
        );
        
        const formattedData = response.data.map((item) => ({
          key: item.reported_post.id,
          caption: item.reported_post.caption,
          reports: item.total_reports,
          falsal: item.reported_post.isForSale,
          userId: item.reported_post.user_id,
        }));
        
        setDataSource(formattedData);
      } catch (error) {
        console.error('Error getting top reported posts:', error);
        setError(error);
      }
    };

    fetchTopReportedPosts();
  }, []);

  const handleDelete = async (key) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/posts/${key}`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('userToken')}`
        },
      });
      message.success('Post deleted successfully');
      setDataSource(dataSource.filter(item => item.key !== key));
    } catch (error) {
      message.error('Failed to delete post');
      console.error('Error deleting post:', error);
    }
  };

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo) => (
        <img src={photo} alt="Post" style={{ width: 100, height: 100, objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Caption',
      dataIndex: 'caption',
      key: 'caption',
    },
    {
      title: 'Reports',
      dataIndex: 'reports',
      key: 'reports',
    },
    {
      title: 'User',
      key: 'user',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={record.userPhoto} />
          <span style={{ marginLeft: 8 }}>{record.userName}</span>
        </div>
      ),
    },
    {
      title: 'Falsal',
      dataIndex: 'falsal',
      key: 'falsal',
      render: (falsal) => (
        <Tag color={falsal ? 'green' : 'red'}>
          {falsal ? 'True' : 'False'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this post?"
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
    return <div>Error loading posts: {error.message}</div>;
  }

  return (
    <div>
      <h2>High Report Posts</h2>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default PostsReports;
