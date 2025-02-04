import { useEffect } from 'react';
import { useFetch } from '@/hooks';
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUserRequest } from '@/redux/reducer/userReducer';
import { Loading } from '@/components';
import { toast } from 'react-toastify';

const EditUserPage = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(`/users/${id}`);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        id: data.id,
        name: data.name,
        username: data.username,
        password: data.password,
        role: data.role
      });
    }
  }, [data, form]);

  useEffect(() => {
    if (error) toast.error('Error while fetching data !');
  }, [error]);

  const handleFinish = (values) => {
    dispatch(updateUserRequest(values));
    navigate('/admin/user');
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Row
          gutter={16}
          justify={'center'}
          align={'center'}
          className='mx-auto! max-w-lg rounded-lg bg-white p-4 shadow-lg'
        >
          <Col span={24}>
            <Typography.Title className='text-center' type='h1'>
              User id: {id}
            </Typography.Title>
            <Form
              wrapperCol={{
                span: 24
              }}
              autoComplete='off'
              layout='vertical'
              form={form}
              onFinish={handleFinish}
            >
              <Form.Item
                name='id'
                label='Id'
                rules={[
                  {
                    required: true,
                    message: 'Please input your id !'
                  }
                ]}
                className='mb-1!'
              >
                <Input
                  className='py-2 outline-none focus:border-[#86b7fe] focus:bg-[color:var(--bs-body-bg)] focus:text-[color:var(--bs-body-color)] focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]'
                  placeholder='Enter id...'
                  name='id'
                />
              </Form.Item>
              <Form.Item
                name='name'
                label='Last name'
                rules={[
                  {
                    required: true,
                    message: 'Please input your last name !'
                  }
                ]}
                className='mb-1!'
              >
                <Input
                  className='py-2 outline-none focus:border-[#86b7fe] focus:bg-[color:var(--bs-body-bg)] focus:text-[color:var(--bs-body-color)] focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]'
                  placeholder='Enter last name...'
                  name='name'
                />
              </Form.Item>
              <Form.Item
                name='username'
                label='Username'
                rules={[
                  {
                    required: true,
                    message: 'Please input your username !'
                  }
                ]}
                className='mb-1!'
              >
                <Input
                  className='py-2 outline-none focus:border-[#86b7fe] focus:bg-[color:var(--bs-body-bg)] focus:text-[color:var(--bs-body-color)] focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]'
                  placeholder='Enter username...'
                  name='username'
                />
              </Form.Item>
              <Form.Item
                name='password'
                label='Password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your password !'
                  }
                ]}
                className='mb-1!'
              >
                <Input.Password
                  className='py-2 outline-none focus:border-[#86b7fe] focus:bg-[color:var(--bs-body-bg)] focus:text-[color:var(--bs-body-color)] focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]'
                  placeholder='Enter password...'
                  name='password'
                />
              </Form.Item>
              <Form.Item
                name='role'
                label='Select a role'
                rules={[
                  {
                    required: true,
                    message: 'Please selected a role'
                  }
                ]}
                className='mb-1!'
              >
                <Select
                  style={{
                    width: 120
                  }}
                  options={[
                    {
                      value: 'Admin',
                      label: 'Admin'
                    },
                    {
                      value: 'Editor',
                      label: 'Editor'
                    },
                    {
                      value: 'User',
                      label: 'User'
                    }
                  ]}
                />
              </Form.Item>

              <Row gutter={16} className='mt-5 gap-y-2'>
                <Col span={24}>
                  <Button block type='primary' htmlType='submit'>
                    Update
                  </Button>
                </Col>
                <Col span={24}>
                  <Button
                    block
                    type='default'
                    htmlType='button'
                    onClick={() => navigate('/admin/user')}
                  >
                    Back
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};
export default EditUserPage;
