import { Button, Popconfirm, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

const UserListAntd = ({ users, onDeleteUser }) => {
  const navigate = useNavigate();
  const dataSource = users.map((user) => ({ ...user, key: user.id }));

  const columns = [
    {
      title: 'First name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      dataIndex: 'operation',
      render: (_, record) => {
        return dataSource.length >= 1 ? (
          <div className='flex justify-end gap-x-2'>
            <Button
              color='primary'
              variant='outlined'
              onClick={() => navigate(`/user/${record.id}`)}
            >
              Update
            </Button>
            <Popconfirm
              title='Sure to delete?'
              onConfirm={() => onDeleteUser(record.id)}
            >
              <Button color='danger' variant='outlined'>
                Delete
              </Button>
            </Popconfirm>
          </div>
        ) : null;
      }
    }
  ];

  return <Table pagination={false} dataSource={dataSource} columns={columns} />;
};
export default UserListAntd;
