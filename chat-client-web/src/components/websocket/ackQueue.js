
class AckQueue {

	ackQueue = new Map();

	addSeqId = (seqId, data) => {
		this.ackQueue.set(seqId, data)
	};

	getBySeqId = (seqId) => {
		return  this.ackQueue.get(seqId);
	}

	deleteSeqId = (seqId) => {
		this.ackQueue.delete(seqId)
	}

}

export default new AckQueue()