const commandMap = new Map();

/**
 * 0,  LoginRequestMessage
 * 1,  LoginResponseMessage
 * 2,  LogoutRequestMessage
 * 3,  LogoutResponseMessage
 * 4,  C2CSendRequestMessage
 * 5,  C2CSendResponseMessage
 * 6,  C2CPushRequestMessage
 * 7,  C2CPushResponseMessage
 * 8,  C2GSendRequestMessage
 * 9,  C2GSendResponseMessage
 * 10, C2GPushRequestMessage
 * 11, C2GPushResponseMessage
 * 12, HeartBeatRequestMessage
 * 13, HeartBeatResponseMessage
 */
commandMap.set(5, 'C2CSendResponseMessage');
commandMap.set(6, 'C2CPushRequestMessage');


function handleMessage(command, seqId, data) {
	if (commandMap.get(command) === 'C2CSendResponseMessage') {

	}
}

export {
	handleMessage
}