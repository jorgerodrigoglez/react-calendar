// yarn add @reduxjs/toolkit
// yarn add react-redux
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice, authSlice } from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
    },
    // elimina el error de las fechas en la consola
    middleware: (getDefaultMiddlware) => getDefaultMiddlware({
        serializableCheck: false,
    }),
})