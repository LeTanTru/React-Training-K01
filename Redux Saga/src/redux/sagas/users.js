import {
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';
import * as actions from '@/redux/actions/users';
import * as api from '@/apis/users';

function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(actions.getUsersSuccess({ users: result.data, loading: false }));
  } catch (error) {
    yield put(
      actions.usersError({
        error: 'An error occurred when trying to get the users'
      })
    );
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* createUser({ payload }) {
  try {
    yield call(api.createUser, {
      firstName: payload.firstName,
      lastName: payload.lastName
    });
    yield call(getUsers);
  } catch (error) {
    yield put(
      actions.usersError({
        error: 'An error occurred when trying to create the user'
      })
    );
  }
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

function* deleteUser(userId) {
  try {
    yield call(api.deleteUser, userId);
    yield call(getUsers);
  } catch (e) {
    yield put(
      actions.usersError({
        error: 'An error occurred when trying to delete the user'
      })
    );
  }
}

function* watchDeleteUserRequest() {
  while (true) {
    const { payload } = yield take(actions.Types.DELETE_USER_REQUEST);
    yield call(deleteUser, payload.userId);
  }
}

function* updateUser({ payload }) {
  try {
    const { id, firstName, lastName } = payload;
    yield call(api.updateUser, { id, firstName, lastName });
    yield call(getUsers);
  } catch (e) {
    yield put(
      actions.usersError({
        error: 'An error occurred when trying to update the user'
      })
    );
  }
}

function* watchUpdateUserRequest() {
  yield takeLatest(actions.Types.UPDATE_USER_REQUEST, updateUser);
}

function* getUserById({ payload }) {
  try {
    const { userId } = payload;
    const result = yield call(api.getUserById, userId);
    yield put(actions.getUsersSuccess({ users: [result.data] }));
  } catch (e) {
    yield put(
      actions.usersError({
        error: 'An error occurred when trying to update the user'
      })
    );
  }
}

function* watchGetUserById() {
  yield takeLatest(actions.Types.GET_USER_BY_ID, getUserById);
}

const usersSagas = [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest),
  fork(watchUpdateUserRequest),
  fork(watchGetUserById)
];

export default usersSagas;
