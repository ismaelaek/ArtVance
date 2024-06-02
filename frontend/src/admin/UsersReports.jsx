import React from "react";
import { Table, Button, Popconfirm, message, Avatar } from "antd";

const dataSource = [
  {
    key: "1",
    name: "John Brown",
    email: "john.brown@example.com",
    reports: 32,
    photo: "https://via.placeholder.com/40",
  },
  {
    key: "2",
    name: "Jim Green",
    email: "jim.green@example.com",
    reports: 42,
    photo: "https://via.placeholder.com/40",
  },
  {
    key: "3",
    name: "Joe Black",
    email: "joe.black@example.com",
    reports: 28,
    photo: "https://via.placeholder.com/40",
  },
  {
    key: "4",
    name: "Jim Red",
    email: "jim.red@example.com",
    reports: 36,
    photo: "https://via.placeholder.com/40",
  },
];

const UsersReports = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  const handleDelete = (key) => {
    // Add your delete logic here
    message.success("User deleted successfully");
  };

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text) => <Avatar src={text} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Reports",
      dataIndex: "reports",
      key: "reports",
    },
    {
      title: "Action",
      key: "action",
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

  return (
    <div>
      <h2>High Report Users</h2>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default UsersReports;
