import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    user: null,
    error: ''
  },
  reducers: {
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload
      };
    },
    setError: (state, action) => {
      return { ...state, error: action.payload };
    },
    updateUserRequest: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    }
  }
});

export const { updateUserRequest, updateUserSuccess, setLoading, setError } =
  userSlice.actions;

export default userSlice.reducer;
