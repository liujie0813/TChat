const colors = [
	'#f56a00',
	'#7265e6',
	'#ffbf00',
	'#00a2ae',
	'blue'
];

function getColor(val) {
	if (val) {
		let last = val.charCodeAt(val.length - 1);
		return colors[last % colors.length];
	}
	return 'gray';
}

export {
	getColor,
}