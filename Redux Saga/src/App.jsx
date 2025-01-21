import {
  createUserRequest,
  deleteUserRequest,
  getUsersRequest,
  updateUserRequest,
  usersError
} from '@/actions/users';
import { Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NewUserForm from '@/components/NewUserForm';
import UserList from '@/components/UserList';
import UpdateUserForm from '@/components/UpdateUserForm';
import { Col, Row } from 'antd';
import NewUserFormAntd from '@/components/antd/NewUserFormAntd';
import UserListAntd from '@/components/antd/UserListAntd';
import UpdateUserFormAntd from '@/components/antd/UpdateUserFormAntd';

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [user, setUser] = useState(null);

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

  const handleUpdateUser = (user) => {
    dispatch(updateUserRequest(user));
    setUser(null);
  };

  return (
    <div className='mx-auto w-[1200px] p-5'>
      <Row gutter={16} justify={'center'}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
          {user ? (
            <UpdateUserFormAntd
              onSubmit={handleUpdateUser}
              onCancel={() => setUser(null)}
              user={user}
              setUser={setUser}
            />
          ) : (
            <NewUserFormAntd onSubmit={handleSubmit} />
          )}
          <UserListAntd
            users={users.items}
            setUser={setUser}
            onDeleteUser={handleDeleteUser}
          />
        </Col>
      </Row>
    </div>
  );
};

export default App;
