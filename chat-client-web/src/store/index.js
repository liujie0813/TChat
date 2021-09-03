import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import userSlice from './features/UserSlice';
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
	user: userSlice,
});

const persistConfig = {
	key: 'root',
	storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
	reducer: persistedReducer,
	middleware: [thunk]
});