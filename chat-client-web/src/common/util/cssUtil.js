const colors = [
	'#f56a00',
	'#7265e6',
	'#ffbf00',
	'#00a2ae'
];

function getColor(val) {
	if (val) {
		let first = val.charCodeAt(0);
		return colors[first % colors.length];
	}
	return 'gray';
}

export {
	getColor,
}