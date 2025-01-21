import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const UpdateUserForm = ({ user, setUser, onSubmit, onCancel }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>First name: </Label>
        <Input
          placeholder='First name'
          required
          name='firstName'
          value={user.firstName}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Last name: </Label>
        <Input
          placeholder='Last name'
          required
          name='lastName'
          value={user.lastName}
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
