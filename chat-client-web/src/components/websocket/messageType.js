export const messageType = {

	AuthRequestMessage:       { code: 0,  desc: 'AuthRequestMessage'      },
	AuthResponseMessage:      { code: 1,  desc: 'AuthResponseMessage'     },
	C2CSendRequestMessage:    { code: 2,  desc: 'C2CSendRequestMessage'    },
	C2CSendResponseMessage:   { code: 3,  desc: 'C2CSendResponseMessage'   },
	C2CPushRequestMessage:    { code: 4,  desc: 'C2CPushRequestMessage'    },
	C2CPushResponseMessage:   { code: 5,  desc: 'C2CPushResponseMessage'   },
	C2GSendRequestMessage:    { code: 6,  desc: 'C2GSendRequestMessage'    },
	C2GSendResponseMessage:   { code: 7,  desc: 'C2GSendResponseMessage'   },
	C2GPushRequestMessage:    { code: 8,  desc: 'C2GPushRequestMessage'    },
	C2GPushResponseMessage:   { code: 9,  desc: 'C2GPushResponseMessage'   },
	HeartBeatRequestMessage:  { code: 10, desc: 'HeartBeatRequestMessage'  },
	HeartBeatResponseMessage: { code: 11, desc: 'HeartBeatResponseMessage' },
	JoinGroupRequestMessage:  { code: 12, desc: 'JoinGroupRequestMessage'  },
	JoinGroupResponseMessage: { code: 13, desc: 'JoinGroupResponseMessage' },
	ApplyRequestMessage:      { code: 14, desc: 'ApplyRequestMessage'      },
	ApplyResponseMessage:     { code: 15, desc: 'ApplyResponseMessage'     },
	GenericMessage:           { code: 99, desc: 'GenericMessage'           },
};

export const commandMap = new Map();

commandMap.set(messageType.AuthRequestMessage      .code, messageType.AuthRequestMessage      );
commandMap.set(messageType.AuthResponseMessage     .code, messageType.AuthResponseMessage     );
commandMap.set(messageType.C2CSendRequestMessage   .code, messageType.C2CSendRequestMessage   );
commandMap.set(messageType.C2CSendResponseMessage  .code, messageType.C2CSendResponseMessage  );
commandMap.set(messageType.C2CPushRequestMessage   .code, messageType.C2CPushRequestMessage   );
commandMap.set(messageType.C2CPushResponseMessage  .code, messageType.C2CPushResponseMessage  );
commandMap.set(messageType.C2GSendRequestMessage   .code, messageType.C2GSendRequestMessage   );
commandMap.set(messageType.C2GSendResponseMessage  .code, messageType.C2GSendResponseMessage  );
commandMap.set(messageType.C2GPushRequestMessage   .code, messageType.C2GPushRequestMessage   );
commandMap.set(messageType.C2GPushResponseMessage  .code, messageType.C2GPushResponseMessage  );
commandMap.set(messageType.HeartBeatRequestMessage .code, messageType.HeartBeatRequestMessage );
commandMap.set(messageType.HeartBeatResponseMessage.code, messageType.HeartBeatResponseMessage);
commandMap.set(messageType.JoinGroupRequestMessage .code, messageType.JoinGroupRequestMessage );
commandMap.set(messageType.JoinGroupResponseMessage.code, messageType.JoinGroupResponseMessage);
commandMap.set(messageType.ApplyRequestMessage     .code, messageType.ApplyRequestMessage     );
commandMap.set(messageType.ApplyResponseMessage    .code, messageType.ApplyResponseMessage    );
commandMap.set(messageType.GenericMessage          .code, messageType.GenericMessage          );

