import { Descriptions, Spin, Alert } from 'antd';
import { getUserByIdRequest } from '@/redux/actions/users';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const user = users[0];

  useEffect(() => {
    dispatch(getUserByIdRequest(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <Spin indicator={<LoadingOutlined spin />} size='large' />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message='Error'
        description={error}
        type='error'
        showIcon
        className='mt-4'
      />
    );
  }

  if (!user) {
    return (
      <Alert
        message='User not found'
        description='The user you are looking for does not exist.'
        type='warning'
        showIcon
        className='mt-4'
      />
    );
  }

  return (
    <Descriptions title='User Details' bordered column={2} className='mt-4'>
      <Descriptions.Item label='Name'>{user.name}</Descriptions.Item>
      <Descriptions.Item label='Username'>{user.username}</Descriptions.Item>
      <Descriptions.Item label='Email'>{user.email}</Descriptions.Item>
      <Descriptions.Item label='Phone'>{user.phone}</Descriptions.Item>
      <Descriptions.Item label='Website'>{user.website}</Descriptions.Item>
      <Descriptions.Item label='Address'>
        {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
      </Descriptions.Item>
      <Descriptions.Item label='Company'>
        {`${user.company.name} (${user.company.catchPhrase})`}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default UserDetail;
