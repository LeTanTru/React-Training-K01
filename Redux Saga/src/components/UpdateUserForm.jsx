import { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const UpdateUserForm = ({ user, onSubmit = () => {}, onCancel = () => {} }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(updatedUser);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>First name: </Label>
        <Input
          placeholder='First name'
          required
          name='firstName'
          value={updatedUser.firstName}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Last name: </Label>
        <Input
          placeholder='Last name'
          required
          name='lastName'
          value={updatedUser.lastName}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup className='flex flex-col gap-y-2'>
        <Button block outline type='submit' color='primary'>
          Update
        </Button>
        <Button
          block
          outline
          type='button'
          color='secondary'
          onClick={onCancel}
        >
          Cancel
        </Button>
      </FormGroup>
    </Form>
  );
};
export default UpdateUserForm;
