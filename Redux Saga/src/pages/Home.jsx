import {
  createUserRequest,
  deleteUserRequest,
  getUsersRequest
} from '@/redux/actions/users';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Col, Row, Spin } from 'antd';
import NewUserFormAntd from '@/components/antd/NewUserFormAntd';
import UserListAntd from '@/components/antd/UserListAntd';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

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
      {/* <Col span={12}>
        <NewUserFormAntd onSubmit={handleSubmit} />
      </Col> */}
      <Col span={24}>
        {loading ? (
          <div className='flex items-center justify-center'>
            <Spin indicator={<LoadingOutlined spin />} size='large' />
          </div>
        ) : (
          <UserListAntd users={users} onDeleteUser={handleDeleteUser} />
        )}
      </Col>
    </Row>
  );
};

export default Home;
