import { Types } from '@/redux/actions/users';

const INITIAL_STATE = {
  users: [],
  loading: true
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload.users,
        loading: action.payload.loading
      };
    }
    case Types.USERS_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        loading: action.payload.loading
      };
    }
    default: {
      return state;
    }
  }
}
