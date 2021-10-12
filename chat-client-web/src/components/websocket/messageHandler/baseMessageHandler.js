import store from "../../../store";

export default class BaseMessageHandler {

	getUserState = () => {
		return store.getState().user;
	}

}