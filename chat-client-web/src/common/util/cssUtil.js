const colors = [
	'red',
	'orange',
	'green',
	'blue',
	'purple'
]

function getColor(val) {
	return colors[val % colors.length];
}

export {
	getColor,
}