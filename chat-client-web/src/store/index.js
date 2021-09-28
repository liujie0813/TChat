import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import userSlice from './features/userSlice';
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";

const appReducers = combineReducers({
	user: userSlice
});

const rootReducers = (state, action) => {
	if (action.type === 'users/logout') {
		storage.removeItem('persist:root')
		return appReducers(undefined, action);
	}
	return appReducers(state, action)
}

const persistConfig = {
	key: 'root',
	storage
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk]
});

export default store;