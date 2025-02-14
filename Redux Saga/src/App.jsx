import {
  createUserRequest,
  deleteUserRequest,
  getUsersRequest,
  updateUserRequest,
  usersError
} from '@/redux/actions/users';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import NewUserFormAntd from '@/components/antd/NewUserFormAntd';
import UserListAntd from '@/components/antd/UserListAntd';
import UpdateUserFormAntd from '@/components/antd/UpdateUserFormAntd';

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);

  const handleSubmit = ({ firstName, lastName }) => {
    dispatch(createUserRequest({ firstName, lastName }));
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUserRequest(userId));
  };

  const handleCloseAlert = () => {
    dispatch(usersError({ error: '' }));
  };

  return (
    <div className='mx-auto w-[1200px] p-5'>
      <Row gutter={16} justify={'center'}>
        {/* <Col span={12}>
          <Alert
            color='danger'
            isOpen={!!users.error}
            timeout={500}
            toggle={handleCloseAlert}
          >
            {users.error}
          </Alert>
          {user ? (
            <UpdateUserForm
              onSubmit={handleUpdateUser}
              onCancel={() => setUser(null)}
              user={user}
              setUser={setUser}
            />
          ) : (
            <NewUserForm onSubmit={handleSubmit} />
          )}
          <UserList
            users={users.items}
            setUser={setUser}
            onDeleteUser={handleDeleteUser}
          />
        </Col> */}
        <Col span={12}>
          <NewUserFormAntd onSubmit={handleSubmit} />
          <UserListAntd users={users.items} onDeleteUser={handleDeleteUser} />
        </Col>
      </Row>
    </div>
  );
};

export default App;
