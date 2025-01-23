import { getUserByIdRequest, updateUserRequest } from '@/actions/users';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserByIdRequest(id));
  }, [dispatch, id]);
  const user = useSelector((state) => state.users.users[0]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName
      });
    }
  }, [user, form]);

  const handleFinish = (values) => {
    dispatch(updateUserRequest({ id, ...values }));
    navigate('/user');
  };

  return (
    <Row gutter={16} justify={'center'}>
      <Col span={12}>
        <Typography.Title className='text-center' type='h1'>
          User id: {id}
        </Typography.Title>
        <Form
          wrapperCol={{
            span: 24
          }}
          autoComplete='off'
          layout='vertical'
          onFinish={handleFinish}
          form={form}
        >
          <Form.Item
            name='firstName'
            label='First name'
            rules={[
              {
                required: true,
                message: 'Please input your first name !'
              }
            ]}
            className='mb-2'
          >
            <Input
              className='py-2 outline-none focus:border-[#86b7fe] focus:bg-[color:var(--bs-body-bg)] focus:text-[color:var(--bs-body-color)] focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]'
              placeholder='Enter first name...'
              name='firstName'
            />
          </Form.Item>
          <Form.Item
            name='lastName'
            label='Last name'
            rules={[
              {
                required: true,
                message: 'Please input your last name !'
              }
            ]}
            className='mb-2'
          >
            <Input
              className='mb-2 py-2 outline-none focus:border-[#86b7fe] focus:bg-[color:var(--bs-body-bg)] focus:text-[color:var(--bs-body-color)] focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]'
              placeholder='Enter last name...'
              name='lastName'
            />
          </Form.Item>

          <Row gutter={16} className='gap-y-2'>
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
                onClick={() => navigate('/')}
              >
                Back
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
export default UpdateUser;
