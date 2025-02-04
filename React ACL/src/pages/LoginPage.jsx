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
  const [credentials, setCredentials] = useState(null);
  const [url, setUrl] = useState('');
  const { data, loading, error } = useFetch(url);
  const navigate = useNavigate();

  const handleRolePermission = useCallback(
    (role) => {
      if (!role) return;
      const rolePaths = {
        Admin: '/admin',
        Editor: '/editor',
        User: '/'
      };
      navigate(rolePaths[role] || '/');
    },
    [navigate]
  );

  // useEffect(() => {
  //   if (storedUser?.role) {
  //     handleRolePermission(storedUser.role);
  //   }
  // }, [handleRolePermission, storedUser?.role]);

  useEffect(() => {
    if (credentials) {
      const { username, password } = credentials;
      setUrl(`/users/?username=${username}&password=${password}`);
    }
  }, [credentials]);

  useEffect(() => {
    if (data) {
      if (data.length === 0) {
        toast.error('Invalid username or password.', toastOption);
      } else {
        const [user] = data;
        const { role } = user;
        toast.success('Login successful.', toastOption);
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
      toast.error('Something went wrong. Please try again.', toastOption);
    }
  }, [data, error]);

  const handleSubmit = (values) => {
    setCredentials(values);
  };

  return (
    <div className='absolute inset-0 mx-auto flex max-w-sm items-center justify-center'>
      <div className='w-full rounded-lg bg-white/80 px-4 py-4'>
        <h2 className='mb-5 text-center text-xl font-bold text-black'>Login</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          className='w-full'
          initialValues={{ username: '', password: '' }}
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
              placeholder='Password'
              name='password'
            />
          </Form.Item>
          <Button
            loading={loading}
            type='primary'
            htmlType='submit'
            className='ml-auto block w-full'
          >
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
