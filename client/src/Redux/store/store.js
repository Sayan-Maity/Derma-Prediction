import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import logger from 'redux-logger';

export default configureStore({
  reducer: {
    user: userReducer,
    middleware: [logger],
  },
});
