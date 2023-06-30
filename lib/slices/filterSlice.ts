import { createSlice } from '@reduxjs/toolkit';

interface ActionType {
  payload: {
    value: string;
  };
}

interface StateType {
  category: string[];
}

const initialState: StateType = {
  category: [],
};

const filters = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggle: ({ category }, { payload }: ActionType) => {
      if (
        payload.value !== 'men' &&
        payload.value !== 'women' &&
        payload.value !== 'unisex'
      )
        return { category };
      const index = category.indexOf(payload.value);
      if (index === -1) category.push(payload.value);
      else category.splice(index, 1);
    },
  },
});

export default filters.reducer;

export const { toggle } = filters.actions;
