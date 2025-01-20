import { Button, ListGroup, ListGroupItem } from 'reactstrap';

const UserList = ({ users, onDeleteUser }) => {
  return (
    <ListGroup>
      {users &&
        users
          .sort((a, b) => {
            if (a.firstName > b.firstName) return 1;
            if (a.firstName < b.firstName) return -1;
            if (a.lastName > b.lastName) return 1;
            if (a.lastName < b.lastName) return -1;
            return 0;
          })
          .map((user) => (
            <ListGroupItem key={user.id}>
              <section className='flex'>
                <div className='mx-0 my-auto flex-1'>
                  {user.firstName} {user.lastName}
                </div>
                <div>
                  <Button
                    outline
                    color='danger'
                    onClick={() => onDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </div>
              </section>
            </ListGroupItem>
          ))}
    </ListGroup>
  );
};
export default UserList;
