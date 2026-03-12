import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface BookingState {
  selectedDate: string | null
  selectedTime: string | null
  selectedTechnicianIndex: number
}

const initialState: BookingState = {
  selectedDate: null,
  selectedTime: null,
  selectedTechnicianIndex: 0
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload
    },
    setSelectedTime: (state, action: PayloadAction<string | null>) => {
      state.selectedTime = action.payload
    },
    setSelectedTechnicianIndex: (state, action: PayloadAction<number>) => {
      state.selectedTechnicianIndex = action.payload
    },
    resetBooking: (state) => {
      state.selectedDate = null
      state.selectedTime = null
      state.selectedTechnicianIndex = 0
    }
  }
})

export const { setSelectedDate, setSelectedTime, setSelectedTechnicianIndex, resetBooking } = bookingSlice.actions
export default bookingSlice.reducer
