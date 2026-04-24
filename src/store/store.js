import { configureStore } from '@reduxjs/toolkit';

// This is a placeholder reducer. You can add more slices here.
const counterReducer = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
