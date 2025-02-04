import { toastOption } from '@/constants';
import { useFetch, useLocalStorage } from '@/hooks';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const { setItem, getItem } = useLocalStorage('user');
  const storedUser = getItem();
  const [form] = Form.useForm();
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const [url, setUrl] = useState('');
  const { data, loading, error } = useFetch(url);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { username, password } = values;
    setUser({ username, password });
  };

  const handleRolePermission = useCallback((role) => {
    if (role === 'Admin') navigate('/admin');
    if (role === 'Editor') navigate('/editor');
    if (role === 'User') navigate('/');
  });

  useEffect(() => {
    handleRolePermission(storedUser?.role);
  }, [handleRolePermission, storedUser?.role]);

  useEffect(() => {
    if (user.username && user.password) {
      setUrl(`/users/?username=${user.username}&password=${user.password}`);
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      if (data?.length === 0) {
        toast.error('Invalid username or password.', toastOption);
      } else {
        toast.success('Login success.', toastOption);
        const [user] = data;
        const { role } = user;
        setItem({
          id: user.id,
          name: user.name,
          role,
          username: user.username
        });
        handleRolePermission(role);
      }
    }

    if (error) {
      toast.error('Something went wrong.', toastOption);
    }
  }, [data, error]);

  return (
    <div className='absolute inset-0 mx-auto flex max-w-sm items-center justify-center'>
      <div className='w-full rounded-lg bg-white/80 px-4 py-4'>
        <h2 className='mb-5 text-center text-xl font-bold text-black'>Login</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          className='w-full'
          initialValues={user}
        >
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder='Username'
              name='username'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type='password'
              placeholder='Password'
              name='password'
            />
          </Form.Item>
          <Button
            loading={loading}
            type='primary'
            htmlType='submit'
            className='ml-auto block w-full text-lg! leading-1!'
          >
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
