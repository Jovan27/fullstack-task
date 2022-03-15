import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  loading: boolean;
  result: null | {
    amount: string;
    currency: string;
  };
  errors: {
    date: null | string;
    amount: null | string;
  };
}

const initialState: AppState = {
  loading: false,
  result: null,
  errors: {
    date: null,
    amount: null,
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setResult: (state, action: PayloadAction<{ amount: string; currency: string }>) => {
      state.result = { ...action.payload };
    },
    clearResult: (state) => {
      state.result = null;
    },
    setError: (state, { payload }: PayloadAction<{ kind: keyof AppState['errors']; message: string }>) => {
      state.errors[payload.kind] = payload.message;
    },
    clearError: (state, { payload }: PayloadAction<{ kind: keyof AppState['errors'] }>) => {
      state.errors[payload.kind] = null;
    },
  },
});

export const { setResult, clearResult, setError, clearError } = appSlice.actions;

export default appSlice.reducer;
