import { Button, Col, Form, Input, Row } from 'antd';

const UpdateUserFormAntd = ({ user, setUser, onSubmit, onCancel }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(user);
  };

  return (
    <Form
      name='update-user-form'
      wrapperCol={{
        span: 24
      }}
      autoComplete='off'
      layout='vertical'
      onFinish={handleSubmit}
      initialValues={user}
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
          value={user.firstName}
          onChange={handleInputChange}
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
          value={user.lastName}
          onChange={handleInputChange}
        />
      </Form.Item>

      <Row gutter={16} className='gap-y-2'>
        <Col span={24}>
          <Button block type='primary' htmlType='submit'>
            Update
          </Button>
        </Col>
        <Col span={24}>
          <Button block type='default' htmlType='button' onClick={onCancel}>
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default UpdateUserFormAntd;
