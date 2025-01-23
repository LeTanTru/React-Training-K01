import {
  createUserRequest,
  deleteUserRequest,
  getUsersRequest
} from '@/redux/actions/users';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Col, Row } from 'antd';
import NewUserFormAntd from '@/components/antd/NewUserFormAntd';
import UserListAntd from '@/components/antd/UserListAntd';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);

  const handleSubmit = ({ firstName, lastName }) => {
    dispatch(createUserRequest({ firstName, lastName }));
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUserRequest(userId));
  };

  useEffect(() => {
    toast.error(error, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce
    });
  }, [error]);

  return (
    <Row gutter={16} justify={'center'}>
      {error && (
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          transition={Bounce}
        />
      )}
      <Col span={12}>
        <NewUserFormAntd onSubmit={handleSubmit} />
        {loading ? (
          <div className='mx-auto h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent'></div>
        ) : (
          <UserListAntd users={users} onDeleteUser={handleDeleteUser} />
        )}
      </Col>
    </Row>
  );
};

export default Home;
