import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import dermaDetectionReducer from '../reducers/dermaDetectionSlice';
import dermaInfoReducer from '../reducers/dermaInfoSlice';
import logger from 'redux-logger';

export default configureStore({
  reducer: {
    user: userReducer,
    dermaDetection: dermaDetectionReducer,
    middleware: [logger],
  },
});
