import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ServicesData } from '~/types/ServiceType'
import { SERVICES } from '~/constants/mock-data'

interface ServiceState {
  services: ServicesData
  loading: boolean
  error: string | null
}

const initialState: ServiceState = {
  services: SERVICES,
  loading: false,
  error: null
}

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<ServicesData>) => {
      state.services = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }
  }
})

export const { setServices, setLoading, setError } = serviceSlice.actions
export default serviceSlice.reducer
