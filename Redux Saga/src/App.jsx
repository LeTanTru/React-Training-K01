import {
  createUserRequest,
  deleteUserRequest,
  getUsersRequest,
  usersError
} from '@/actions/users';
import NewUserForm from '@/components/NewUserForm';
import UserList from '@/components/UserList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'reactstrap';

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);

  const handleSubmit = ({ firstName, lastName }) => {
    dispatch(createUserRequest({ firstName, lastName }));
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUserRequest(userId));
  };

  const handleCloseAlert = () => {
    dispatch(usersError({ error: '' }));
  };

  return (
    <div className='mx-auto w-[600px] p-5'>
      <Alert
        color='danger'
        isOpen={!!users.error}
        timeout={500}
        toggle={handleCloseAlert}
      >
        {users.error}
      </Alert>
      <NewUserForm onSubmit={handleSubmit} />
      <UserList users={users.items} onDeleteUser={handleDeleteUser} />
    </div>
  );
};

export default App;
