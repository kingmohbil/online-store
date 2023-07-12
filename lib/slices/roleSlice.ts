import { createSlice } from '@reduxjs/toolkit';

interface StateType {
  role: string;
}

const initialState: StateType = {
  role: 'guest',
};

const roleSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setRole: (state, action) => {
      return { role: action.payload.role };
    },
  },
});

export default roleSlice.reducer;

export const { setRole } = roleSlice.actions;
