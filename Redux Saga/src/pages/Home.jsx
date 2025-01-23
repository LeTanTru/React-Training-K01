import {
  createUserRequest,
  deleteUserRequest,
  getUsersRequest
} from '@/actions/users';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Col, Row } from 'antd';
import NewUserFormAntd from '@/components/antd/NewUserFormAntd';
import UserListAntd from '@/components/antd/UserListAntd';

const Home = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);

  const handleSubmit = ({ firstName, lastName }) => {
    dispatch(createUserRequest({ firstName, lastName }));
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUserRequest(userId));
  };

  return (
    <Row gutter={16} justify={'center'}>
      <Col span={12}>
        <NewUserFormAntd onSubmit={handleSubmit} />
        {loading ? (
          <div className='h-10 w-10 mx-auto animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent'></div>
        ) : (
          <UserListAntd users={users} onDeleteUser={handleDeleteUser} />
        )}
      </Col>
    </Row>
  );
};

export default Home;
