/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  isOpened: false,
  targetId: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    open: (state, { payload: { type = null, targetId = null } }) => {
      state.modalType = type;
      state.isOpened = true;
      state.targetId = targetId;
    },
    close: (state) => {
      state.modalType = null;
      state.isOpened = false;
      state.targetId = null;
    },
  },
});

export const { actions } = modalsSlice;
export const selectors = {
  getModalType: (state) => state.modals.modalType,
  isOpened: (state) => state.modals.isOpened,
  getTargetId: (state) => state.modals.targetId,
};
export default modalsSlice.reducer;
