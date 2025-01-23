export const Types = {
  GET_USERS_REQUEST: 'users/get_users_request',
  GET_USERS_SUCCESS: 'users/get_users_success',
  CREATE_USER_REQUEST: 'users/create_user_request',
  UPDATE_USER_REQUEST: 'users/update_user_request',
  DELETE_USER_REQUEST: 'users/delete_user_request',
  USERS_ERROR: 'users/user_error',
  GET_USER_BY_ID: 'users/get_user_by_id'
};

export const getUsersRequest = () => ({
  type: Types.GET_USERS_REQUEST
});

export const getUsersSuccess = ({ users, loading }) => ({
  type: Types.GET_USERS_SUCCESS,
  payload: {
    users,
    loading
  }
});

export const createUserRequest = ({ firstName, lastName }) => ({
  type: Types.CREATE_USER_REQUEST,
  payload: {
    firstName,
    lastName
  }
});

export const updateUserRequest = ({ id, firstName, lastName }) => ({
  type: Types.UPDATE_USER_REQUEST,
  payload: {
    id,
    firstName,
    lastName
  }
});

export const deleteUserRequest = (userId) => ({
  type: Types.DELETE_USER_REQUEST,
  payload: {
    userId
  }
});

export const usersError = ({ error }) => ({
  type: Types.USERS_ERROR,
  payload: {
    error
  }
});

export const getUserByIdRequest = (userId) => ({
  type: Types.GET_USER_BY_ID,
  payload: {
    userId
  }
});
