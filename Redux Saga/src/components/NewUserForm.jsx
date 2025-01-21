import { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const NewUserForm = ({ onSubmit }) => {
  const [user, setUser] = useState({ firstName: '', lastName: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
    setUser({ firstName: '', lastName: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>First name: </Label>
        <Input
          name='firstName'
          placeholder='First name'
          onChange={handleInputChange}
          value={user.firstName}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Last name: </Label>
        <Input
          name='lastName'
          placeholder='Last name'
          onChange={handleInputChange}
          value={user.lastName}
          required
        />
      </FormGroup>
      <FormGroup>
        <Button block outline type='submit' color='primary'>
          Create
        </Button>
      </FormGroup>
    </Form>
  );
};
export default NewUserForm;
