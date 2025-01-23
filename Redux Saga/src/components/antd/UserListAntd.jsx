import { Button, Popconfirm, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

const UserListAntd = ({ users, onDeleteUser }) => {
  const navigate = useNavigate();
  const dataSource = users.map((user) => ({ ...user, key: user.id }));

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website'
    }
    // ,
    // {
    //   dataIndex: 'operation',
    //   render: (_, record) => (
    //     <div className='flex justify-end gap-x-2'>
    //       <Button
    //         color='primary'
    //         variant='outlined'
    //         onClick={() => navigate(`/user/${record.id}`)}
    //       >
    //         Update
    //       </Button>
    //       <Popconfirm
    //         title='Sure to delete?'
    //         onConfirm={() => onDeleteUser(record.id)}
    //       >
    //         <Button color='danger' variant='outlined'>
    //           Delete
    //         </Button>
    //       </Popconfirm>
    //     </div>
    //   )
    // }
  ];

  return (
    <Table
      pagination={false}
      dataSource={dataSource}
      columns={columns}
      onRow={(record) => ({
        onClick: () => navigate(`/user/${record.id}`),
        className: 'cursor-pointer'
      })}
    />
  );
};

export default UserListAntd;
