import {
  createUserRequest,
  deleteUserRequest,
  getUsersRequest,
  updateUserRequest,
  usersError
} from '@/actions/users';
import { Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import NewUserForm from '@/components/NewUserForm';
import UpdateUserForm from '@/components/UpdateUserForm';
import UserList from '@/components/UserList';

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [updatedUser, setUpdatedUser] = useState(null);

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

  const handleUpdateUser = (user) => {
    dispatch(updateUserRequest(user));
    setUpdatedUser(null);
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
      {updatedUser ? (
        <UpdateUserForm
          onSubmit={handleUpdateUser}
          onCancel={() => setUpdatedUser(null)}
          user={updatedUser}
        />
      ) : (
        <NewUserForm onSubmit={handleSubmit} />
      )}
      <UserList
        users={users.items}
        setUpdatedUser={setUpdatedUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export default App;
