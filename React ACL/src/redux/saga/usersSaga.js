import {
  setError,
  setLoading,
  updateUserRequest,
  updateUserSuccess
} from '@/redux/reducer/userReducer';
import axios from 'axios';
import { call, fork, put, takeEvery } from 'redux-saga/effects';

const updateUserApi = (id, userData) => {
  return axios
    .put(`/users/${id}`, userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error updating user:', error);
      throw error;
    });
};

function* updateUser({ payload }) {
  try {
    yield put(setLoading(true));
    const updatedUser = yield call(updateUserApi, payload.id, payload);
    yield put(updateUserSuccess(updatedUser));
  } catch (error) {
    yield put(setError(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* watchUpdateUser() {
  yield takeEvery(updateUserRequest.type, updateUser);
}

const usersSaga = [fork(watchUpdateUser)];

export default usersSaga;
