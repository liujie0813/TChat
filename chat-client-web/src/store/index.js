import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import userSlice from './features/userSlice';
import talkRecord from "./features/talkRecord";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
	user: userSlice,
	talk: talkRecord
});

const persistConfig = {
	key: 'root',
	storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk]
});

export default store;