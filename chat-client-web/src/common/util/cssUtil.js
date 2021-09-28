const colors = [
	'#fe6673',
	'#00a2ae',
	'#7265e6',
	'#0099CC',
	'#f56a00',
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