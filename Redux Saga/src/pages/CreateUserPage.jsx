import { createUserRequest } from '@/redux/actions/users';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

const CreateUserPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (value) => {
    dispatch(createUserRequest(value));
    form.resetFields();
    navigate('/user');
    toast.success('Created user successfully !', {
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
  };
  return (
    <Form
      wrapperCol={{
        span: 24
      }}
      autoComplete='off'
      layout='vertical'
      onFinish={handleSubmit}
      initialValues={{ firstName: '', lastName: '' }}
      form={form}
      className='mx-auto w-1/2'
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
        className='mb-3'
      >
        <Input
          className='py-1.5 outline-none focus:border-[#86b7fe] focus:bg-[color:var(--bs-body-bg)] focus:text-[color:var(--bs-body-color)] focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]'
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
        className='mb-3'
      >
        <Input
          className='mb-2 py-1.5 outline-none focus:border-[#86b7fe] focus:bg-[color:var(--bs-body-bg)] focus:text-[color:var(--bs-body-color)] focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]'
          placeholder='Enter last name...'
          name='lastName'
        />
      </Form.Item>

      <Button className='mb-2 py-[18px]' block type='primary' htmlType='submit'>
        Create
      </Button>
      <Button
        block
        type='default'
        htmlType='button'
        onClick={() => navigate('/user')}
      >
        Back
      </Button>
    </Form>
  );
};
export default CreateUserPage;
