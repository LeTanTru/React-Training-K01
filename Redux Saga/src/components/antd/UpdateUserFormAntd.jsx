import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const UpdateUserFormAntd = ({ user }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    // onSubmit(user);
  };

  return (
    <>
      <Typography.Title className='text-center' type='h1'>
        User id: {id}
      </Typography.Title>
      <Form
        wrapperCol={{
          span: 24
        }}
        autoComplete='off'
        layout='vertical'
        onFinish={handleSubmit}
        initialValues={{ firstName: '', lastName: '' }}
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
            <Button block type='default' htmlType='button'>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default UpdateUserFormAntd;
