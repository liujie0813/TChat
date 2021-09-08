import {Queue} from "../../common/js/Queue";

let queue;

function enqueue(seqId) {
	if (queue == null) {
		queue = new Queue();
	}
	queue.enqueue(seqId)
}

function dequeue(seqId) {

}

export {
	enqueue, dequeue
}