import store from '../../store/index'
import {setAuthToken} from "../../store/features/userSlice";

function setLoginToken(accessToken, refreshToken) {
	store.dispatch(setAuthToken(accessToken, refreshToken))
}

function getAccessToken() {
	let state = store.getState();
	return state.user.authToken.accessToken;
}

function getRefreshToken() {
	let state = store.getState();
	return state.user.authToken.refreshToken;
}

export {
	setLoginToken,
	getAccessToken, getRefreshToken
}