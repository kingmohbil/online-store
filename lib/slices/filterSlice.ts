import { createSlice } from '@reduxjs/toolkit';

interface ActionType {
  payload: {
    value: string;
    values?: string[];
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
    add: ({ category }, { payload }: ActionType) => {
      if (payload.values !== undefined)
        for (let index = 0; index < payload.values.length; index++) {
          if (
            payload.values[index] !== 'men' &&
            payload.values[index] !== 'women' &&
            payload.values[index] !== 'unisex'
          )
            return { category };
          else return { category: payload.values };
        }
    },
  },
});

export default filters.reducer;

export const { toggle, add } = filters.actions;
