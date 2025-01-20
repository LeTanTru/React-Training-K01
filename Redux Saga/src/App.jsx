import {
  createUserRequest,
  deleteUserRequest,
  getUsersRequest,
  usersError
} from '@/actions/users';
import NewUserForm from '@/components/NewUserForm';
import UserList from '@/components/UserList';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Alert, Fade } from 'reactstrap';

const App = ({
  users,
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  usersError
}) => {
  useEffect(() => {
    getUsersRequest();
  }, [getUsersRequest]);

  const handleSubmit = ({ firstName, lastName }) => {
    createUserRequest({ firstName, lastName });
  };

  const handleDeleteUser = (userId) => {
    deleteUserRequest(userId);
  };

  const handleCloseAlert = () => {
    usersError({
      error: ''
    });
  };

  return (
    <div className='mx-auto w-[600px] p-5'>
      <Alert color='danger' isOpen={!!users.error} toggle={handleCloseAlert}>
        <Alert
          color='danger'
          isOpen={!!users.error}
          timeout={500}
          toggle={handleCloseAlert}
        >
          <Fade in={!!users.error} timeout={500}></Fade>
        </Alert>
      </Alert>
      <NewUserForm onSubmit={handleSubmit} />
      <UserList users={users.items} onDeleteUser={handleDeleteUser} />
    </div>
  );
};
export default connect(({ users }) => ({ users }), {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  usersError
})(App);
