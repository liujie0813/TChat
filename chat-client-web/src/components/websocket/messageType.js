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
export const messageType = {
	LoginRequestMessage:      { code: 0 , desc: 'LoginRequestMessage'      },
	LoginResponseMessage:     { code: 1 , desc: 'LoginResponseMessage'     },
	LogoutRequestMessage:     { code: 2 , desc: 'LogoutRequestMessage'     },
	LogoutResponseMessage:    { code: 3 , desc: 'LogoutResponseMessage'    },
	C2CSendRequestMessage:    { code: 4 , desc: 'C2CSendRequestMessage'    },
	C2CSendResponseMessage:   { code: 5 , desc: 'C2CSendResponseMessage'   },
	C2CPushRequestMessage:    { code: 6 , desc: 'C2CPushRequestMessage'    },
	C2CPushResponseMessage:   { code: 7 , desc: 'C2CPushResponseMessage'   },
	C2GSendRequestMessage:    { code: 8 , desc: 'C2GSendRequestMessage'    },
	C2GSendResponseMessage:   { code: 9 , desc: 'C2GSendResponseMessage'   },
	C2GPushRequestMessage:    { code: 10, desc: 'C2GPushRequestMessage'    },
	C2GPushResponseMessage:   { code: 11, desc: 'C2GPushResponseMessage'   },
	HeartBeatRequestMessage:  { code: 12, desc: 'HeartBeatRequestMessage'  },
	HeartBeatResponseMessage: { code: 13, desc: 'HeartBeatResponseMessage' },
};