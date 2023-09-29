import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const modalAdapter = createEntityAdapter();

const initialState = {
  type: null,
  channel: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => ({
      ...state, type: payload.type, channel: payload.channel,
    }),
    closeModal: (state) => ({
      ...state, type: null, channel: null,
    }),
  },
});

export const { actions } = modalSlice;
export const selectors = modalAdapter.getSelectors((state) => state.modal);
export default modalSlice.reducer;
