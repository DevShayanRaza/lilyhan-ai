import { createSlice } from '@reduxjs/toolkit';

// Create a slice to manage the moveLeft state
const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    moveLeft: false, // Initial state for moveLeft
  },
  reducers: {
    toggleMoveLeft: (state) => {
      state.moveLeft = !state.moveLeft; // Toggle the moveLeft state
    },
  },
});

// Export the action to toggle the moveLeft state
export const { toggleMoveLeft } = sidebarSlice.actions;

// Export the selector to get the current state of moveLeft
export const selectMoveLeft = (state) => state.sidebar.moveLeft;

// Export the reducer to use in the store
export default sidebarSlice.reducer;
