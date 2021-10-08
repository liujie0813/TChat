/**
 * js 字符串 使用 unicode 编码
 */
// unicode string to utf-8
function stringToByte(str) {
	var result = [], i = 0;
	str = encodeURI(str);
	while (i < str.length) {
		var c = str.charCodeAt(i++);
		// if it is a % sign, encode the following 2 bytes as a hex value
		if (c === 37) {
			result.push(parseInt(str.substr(i, 2), 16))
			i += 2;
			// otherwise, just the actual byte
		} else {
			result.push(c)
		}
	}
	return coerceArray(result);
}

function checkInt(value) {
	return (parseInt(value) === value);
}

function checkInts(arrayish) {
	if (!checkInt(arrayish.length)) { return false; }
	for (var i = 0; i < arrayish.length; i++) {
		if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
			return false;
		}
	}
	return true;
}

function coerceArray(arg, copy) {
	// ArrayBuffer view
	if (arg.buffer && arg.name === 'Uint8Array') {
		if (copy) {
			if (arg.slice) {
				arg = arg.slice();
			} else {
				arg = Array.prototype.slice.call(arg);
			}
		}
		return arg;
	}
	// It's an array; check it is a valid representation of a byte
	if (Array.isArray(arg)) {
		if (!checkInts(arg)) {
			throw new Error('Array contains invalid value: ' + arg);
		}
		return new Uint8Array(arg);
	}
	// Something else, but behaves like an array (maybe a Buffer? Arguments?)
	if (checkInt(arg.length) && checkInts(arg)) {
		return new Uint8Array(arg);
	}
	throw new Error('unsupported array-like object');
}

// utf8 byte to unicode string
function byteToString(arr) {
	var unicodeStr ="";
	for (var pos = 0; pos < arr.length;){
		var flag= arr[pos];
		var unicode = 0 ;
		if ((flag >>>7) === 0 ) {
			unicodeStr+= String.fromCharCode(arr[pos]);
			pos += 1;

		} else if ((flag &0xFC) === 0xFC ){
			unicode = (arr[pos] & 0x3) << 30;
			unicode |= (arr[pos+1] & 0x3F) << 24;
			unicode |= (arr[pos+2] & 0x3F) << 18;
			unicode |= (arr[pos+3] & 0x3F) << 12;
			unicode |= (arr[pos+4] & 0x3F) << 6;
			unicode |= (arr[pos+5] & 0x3F);
			unicodeStr+= String.fromCharCode(unicode) ;
			pos += 6;

		}else if ((flag &0xF8) === 0xF8 ){
			unicode = (arr[pos] & 0x7) << 24;
			unicode |= (arr[pos+1] & 0x3F) << 18;
			unicode |= (arr[pos+2] & 0x3F) << 12;
			unicode |= (arr[pos+3] & 0x3F) << 6;
			unicode |= (arr[pos+4] & 0x3F);
			unicodeStr+= String.fromCharCode(unicode) ;
			pos += 5;

		} else if ((flag &0xF0) === 0xF0 ){
			unicode = (arr[pos] & 0xF) << 18;
			unicode |= (arr[pos+1] & 0x3F) << 12;
			unicode |= (arr[pos+2] & 0x3F) << 6;
			unicode |= (arr[pos+3] & 0x3F);
			unicodeStr+= String.fromCharCode(unicode) ;
			pos += 4;

		} else if ((flag &0xE0) === 0xE0 ){
			unicode = (arr[pos] & 0x1F) << 12;
			unicode |= (arr[pos+1] & 0x3F) << 6;
			unicode |= (arr[pos+2] & 0x3F);
			unicodeStr+= String.fromCharCode(unicode);
			pos += 3;

		} else if ((flag &0xC0) === 0xC0 ){ //110
			unicode = (arr[pos] & 0x3F) << 6;
			unicode |= (arr[pos+1] & 0x3F);
			unicodeStr+= String.fromCharCode(unicode) ;
			pos += 2;

		} else{
			unicodeStr+= String.fromCharCode(arr[pos]);
			pos += 1;
		}
	}
	return unicodeStr;
}



function int4ToByte(i) {
	var bytes =[];
	bytes[0] = (i & 0xFF);
	bytes[1] = (i >> 8 & 0xFF);
	bytes[2] = (i >> 16 & 0xFF);
	bytes[3] = (i >> 24 & 0xFF);
	return bytes;
}

function byteToInt4(bytes) {
	var b3 = bytes[0] & 0xFF;
	var b2 = bytes[1] & 0xFF;
	var b1 = bytes[2] & 0xFF;
	var b0 = bytes[3] & 0xFF;
	return (b0 << 24) | (b1 << 16) | (b2 << 8) | b3;
}

function isDigitOrLetter(val) {
	var regex = /^[A-Za-z0-9]*$/
	return regex.test(val);
}

export {
	stringToByte, byteToString,
	int4ToByte, byteToInt4,
	isDigitOrLetter
}