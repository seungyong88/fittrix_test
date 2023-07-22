import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
  userRoleModal: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    controlModal: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    controlMessageModal: (state, action) => {
      state.messageModal = action.payload.value;
      state.message = action.payload.message;
      state.size = action.payload.size;
    },
  },
})

// Action creators are generated for each case reducer function
export const { controlModal, controlMessageModal } = modalSlice.actions
export default modalSlice.reducer