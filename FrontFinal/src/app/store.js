
import { configureStore } from '@reduxjs/toolkit';
import detailSlice from '../layout/detailSlice';
import userSlice from '../layout/userSlice';
import reviewSlice from '../layout/reviewSlice';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';

const reducers = combineReducers({
    user: userSlice,
    detail: detailSlice,
    review: reviewSlice
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});