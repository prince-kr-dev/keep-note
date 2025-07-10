import { configureStore } from '@reduxjs/toolkit'
import  KeepNoteReducer  from './redux/KeepNoteSlice'

export const store = configureStore({
  reducer: {
    notes: KeepNoteReducer,
  },
})