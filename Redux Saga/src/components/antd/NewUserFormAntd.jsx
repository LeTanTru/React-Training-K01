import { Button, Form, Input } from 'antd';

const NewUserFormAntd = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = (value) => {
    onSubmit(value);
    form.resetFields();
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
    </Form>
  );
};
export default NewUserFormAntd;
