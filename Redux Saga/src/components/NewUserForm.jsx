import { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const NewUserForm = ({ onSubmit }) => {
  const [user, setUser] = useState({ firstName: '', lastName: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
    setUser({ firstName: '', lastName: '' });
  };

  const handleFirstNameChange = (e) => {
    setUser({ ...user, firstName: e.target.value });
  };

  const handleLastNameChange = (e) => {
    setUser({ ...user, lastName: e.target.value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>First name: </Label>
        <Input
          placeholder='First name'
          onChange={handleFirstNameChange}
          value={user.firstName}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Last name: </Label>
        <Input
          placeholder='Last name'
          onChange={handleLastNameChange}
          value={user.lastName}
          required
        />
      </FormGroup>
      <FormGroup>
        <Button
          block
          outline
          type='submit'
          color='primary'
        >
          Create
        </Button>
      </FormGroup>
    </Form>
  );
};
export default NewUserForm;
